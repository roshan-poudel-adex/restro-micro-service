import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();
const prisma = new PrismaClient();

const createOrderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerPhone: Joi.string().required(),
  customerEmail: Joi.string().email().optional(),
  type: Joi.string().valid('PICKUP', 'DELIVERY').required(),
  items: Joi.array().items(
    Joi.object({
      menuItemId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      notes: Joi.string().optional(),
    })
  ).min(1).required(),
  address: Joi.string().when('type', {
    is: 'DELIVERY',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  notes: Joi.string().optional(),
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [PICKUP, DELIVERY]
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     notes:
 *                       type: string
 *               address:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) throw error;

    const { customerName, customerPhone, customerEmail, type, items, address, notes } = value;

    // Calculate total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      });

      if (!menuItem || !menuItem.isActive) {
        return res.status(400).json({ error: `Menu item not found or inactive: ${item.menuItemId}` });
      }

      const itemTotal = menuItem.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price,
        notes: item.notes,
      });
    }

    // Add delivery fee if applicable
    const deliveryFee = type === 'DELIVERY' ? 3.50 : 0;
    total += deliveryFee;

    // Generate order number
    const orderNumber = `EK${Date.now().toString().slice(-6)}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: req.user!.id,
        customerName,
        customerPhone,
        customerEmail,
        type,
        total,
        deliveryFee,
        address,
        notes,
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    // Update menu item order counts
    for (const item of items) {
      await prisma.menuItem.update({
        where: { id: item.menuItemId },
        data: {
          orderCount: {
            increment: item.quantity
          }
        }
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        orderId: order.id,
        action: 'ORDER_CREATED',
        description: `Order ${orderNumber} created`,
        metadata: JSON.stringify({ total, type, itemCount: items.length }),
      }
    });

    logger.info(`Order created: ${orderNumber} by ${req.user!.email}`);

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (admin/staff) or user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by order type
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    // If not admin/staff, only show user's orders
    if (!['ADMIN', 'MANAGER', 'STAFF'].includes(req.user!.role)) {
      where.customerId = req.user!.id;
    }

    if (status) where.status = status;
    if (type) where.type = type;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              menuItem: true
            }
          },
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.order.count({ where })
    ]);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    const where: any = { id };

    // If not admin/staff, only show user's orders
    if (!['ADMIN', 'MANAGER', 'STAFF'].includes(req.user!.role)) {
      where.customerId = req.user!.id;
    }

    const order = await prisma.order.findFirst({
      where,
      include: {
        items: {
          include: {
            menuItem: true
          }
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status (admin/staff only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, PREPARING, READY, OUT_FOR_DELIVERY, COMPLETED, CANCELLED]
 *               estimatedTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.patch('/:id/status', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { status, estimatedTime } = req.body;

    const validStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(estimatedTime && { estimatedTime })
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        orderId: order.id,
        action: 'ORDER_STATUS_UPDATED',
        description: `Order ${order.orderNumber} status updated to ${status}`,
        metadata: JSON.stringify({ previousStatus: order.status, newStatus: status }),
      }
    });

    logger.info(`Order status updated: ${order.orderNumber} to ${status} by ${req.user!.email}`);

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    next(error);
  }
});

export default router;