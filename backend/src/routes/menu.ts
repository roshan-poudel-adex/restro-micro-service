import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const createMenuItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  image: Joi.string().uri().optional(),
  isVegetarian: Joi.boolean().default(false),
  spiceLevel: Joi.number().min(0).max(3).default(0),
  ingredients: Joi.string().optional(),
  allergens: Joi.string().optional(),
});

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: isVegetarian
 *         schema:
 *           type: boolean
 *         description: Filter vegetarian items
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, isActive, isVegetarian } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (isVegetarian !== undefined) where.isVegetarian = isVegetarian === 'true';

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: [
        { orderCount: 'desc' },
        { rating: 'desc' },
        { name: 'asc' }
      ]
    });

    res.json({ menuItems });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create a new menu item (admin/manager only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *               isVegetarian:
 *                 type: boolean
 *               spiceLevel:
 *                 type: number
 *               ingredients:
 *                 type: string
 *               allergens:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menu item created successfully
 */
router.post('/', authenticate, authorize(['ADMIN', 'MANAGER']), async (req: AuthRequest, res, next) => {
  try {
    const { error, value } = createMenuItemSchema.validate(req.body);
    if (error) throw error;

    const menuItem = await prisma.menuItem.create({
      data: value
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'MENU_ITEM_CREATED',
        description: `Menu item "${menuItem.name}" created`,
        metadata: JSON.stringify({ menuItemId: menuItem.id, price: menuItem.price }),
      }
    });

    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully
 *       404:
 *         description: Menu item not found
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await prisma.menuItem.findUnique({
      where: { id }
    });

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ menuItem });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update menu item (admin/manager only)
 *     tags: [Menu]
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
 *         description: Menu item updated successfully
 */
router.put('/:id', authenticate, authorize(['ADMIN', 'MANAGER']), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = createMenuItemSchema.validate(req.body);
    if (error) throw error;

    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: value
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'MENU_ITEM_UPDATED',
        description: `Menu item "${menuItem.name}" updated`,
        metadata: JSON.stringify({ menuItemId: menuItem.id }),
      }
    });

    res.json({
      message: 'Menu item updated successfully',
      menuItem
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete menu item (admin only)
 *     tags: [Menu]
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
 *         description: Menu item deleted successfully
 */
router.delete('/:id', authenticate, authorize(['ADMIN']), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await prisma.menuItem.delete({
      where: { id }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'MENU_ITEM_DELETED',
        description: `Menu item "${menuItem.name}" deleted`,
        metadata: JSON.stringify({ menuItemId: menuItem.id }),
      }
    });

    res.json({
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;