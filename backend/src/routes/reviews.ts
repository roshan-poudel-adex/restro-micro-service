import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const createReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
  platform: Joi.string().default('Website'),
});

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by review status
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *         description: Filter by platform
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 */
router.get('/', async (req, res, next) => {
  try {
    const { status, platform } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (platform) where.platform = platform;

    const reviews = await prisma.review.findMany({
      where,
      include: {
        customer: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ reviews });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *               platform:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { error, value } = createReviewSchema.validate(req.body);
    if (error) throw error;

    const { rating, comment, platform } = value;

    const review = await prisma.review.create({
      data: {
        customerId: req.user!.id,
        rating,
        comment,
        platform,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reviews/{id}/status:
 *   patch:
 *     summary: Update review status (admin/manager only)
 *     tags: [Reviews]
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
 *                 enum: [PENDING, APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Review status updated successfully
 */
router.patch('/:id/status', authenticate, authorize(['ADMIN', 'MANAGER']), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
      include: {
        customer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'REVIEW_STATUS_UPDATED',
        description: `Review ${status.toLowerCase()}`,
        metadata: JSON.stringify({ reviewId: id, status }),
      }
    });

    res.json({
      message: 'Review status updated successfully',
      review
    });
  } catch (error) {
    next(error);
  }
});

export default router;