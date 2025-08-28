import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers (admin/manager/staff only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 */
router.get('/', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), async (req: AuthRequest, res, next) => {
  try {
    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        isActive: true,
        createdAt: true,
        orders: {
          where: { status: 'COMPLETED' },
          select: {
            total: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const customersWithStats = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      totalOrders: customer.orders.length,
      totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0),
      lastOrderAt: customer.orders.length > 0 
        ? customer.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt
        : null
    }));

    res.json({ customers: customersWithStats });
  } catch (error) {
    next(error);
  }
});

export default router;