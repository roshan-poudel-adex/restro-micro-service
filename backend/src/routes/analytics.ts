import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics (admin/manager/staff only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard analytics retrieved successfully
 */
router.get('/dashboard', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), async (req: AuthRequest, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    // Today's stats
    const [
      todayOrders,
      todayRevenue,
      totalCustomers,
      totalMenuItems,
      pendingOrders,
      preparingOrders,
      readyOrders,
    ] = await Promise.all([
      prisma.order.count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow
          }
        }
      }),
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow
          },
          status: { not: 'CANCELLED' }
        },
        _sum: { total: true }
      }),
      prisma.user.count({
        where: { role: 'CUSTOMER', isActive: true }
      }),
      prisma.menuItem.count({
        where: { isActive: true }
      }),
      prisma.order.count({
        where: { status: 'PENDING' }
      }),
      prisma.order.count({
        where: { status: 'PREPARING' }
      }),
      prisma.order.count({
        where: { status: 'READY' }
      }),
    ]);

    // Weekly comparison
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const [thisWeekRevenue, lastWeekRevenue] = await Promise.all([
      prisma.order.aggregate({
        where: {
          createdAt: { gte: thisWeekStart },
          status: { not: 'CANCELLED' }
        },
        _sum: { total: true }
      }),
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: lastWeekStart,
            lt: thisWeekStart
          },
          status: { not: 'CANCELLED' }
        },
        _sum: { total: true }
      })
    ]);

    // Popular menu items
    const popularItems = await prisma.menuItem.findMany({
      where: { isActive: true },
      orderBy: { orderCount: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        orderCount: true,
        price: true,
        rating: true
      }
    });

    // Recent orders
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: { name: true, email: true }
        }
      }
    });

    // Calculate growth percentages
    const revenueGrowth = lastWeekRevenue._sum.total 
      ? ((thisWeekRevenue._sum.total || 0) - (lastWeekRevenue._sum.total || 0)) / (lastWeekRevenue._sum.total || 1) * 100
      : 0;

    res.json({
      stats: {
        todayOrders,
        todayRevenue: todayRevenue._sum.total || 0,
        totalCustomers,
        totalMenuItems,
        pendingOrders,
        preparingOrders,
        readyOrders,
        revenueGrowth: Math.round(revenueGrowth * 100) / 100,
      },
      popularItems,
      recentOrders
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/analytics/revenue:
 *   get:
 *     summary: Get revenue analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         description: Time period for analytics
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Number of days to include
 *     responses:
 *       200:
 *         description: Revenue analytics retrieved successfully
 */
router.get('/revenue', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), async (req: AuthRequest, res, next) => {
  try {
    const { period = 'daily', days = 30 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - Number(days));

    let groupBy: string;
    let dateFormat: string;

    switch (period) {
      case 'weekly':
        groupBy = 'YEARWEEK(createdAt)';
        dateFormat = '%Y-W%u';
        break;
      case 'monthly':
        groupBy = 'DATE_FORMAT(createdAt, "%Y-%m")';
        dateFormat = '%Y-%m';
        break;
      default:
        groupBy = 'DATE(createdAt)';
        dateFormat = '%Y-%m-%d';
    }

    // This would need to be adjusted based on your database
    // For now, we'll return aggregated data
    const revenueData = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        status: { not: 'CANCELLED' }
      },
      _sum: {
        total: true
      },
      _count: {
        id: true
      }
    });

    res.json({
      period,
      days: Number(days),
      data: revenueData.map(item => ({
        date: item.createdAt,
        revenue: item._sum.total || 0,
        orders: item._count.id
      }))
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/analytics/customers:
 *   get:
 *     summary: Get customer analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer analytics retrieved successfully
 */
router.get('/customers', authenticate, authorize(['ADMIN', 'MANAGER', 'STAFF']), async (req: AuthRequest, res, next) => {
  try {
    const [
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
      topCustomers
    ] = await Promise.all([
      prisma.user.count({
        where: { role: 'CUSTOMER' }
      }),
      prisma.user.count({
        where: { role: 'CUSTOMER', isActive: true }
      }),
      prisma.user.count({
        where: {
          role: 'CUSTOMER',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),
      prisma.user.findMany({
        where: { role: 'CUSTOMER' },
        include: {
          orders: {
            where: { status: 'COMPLETED' },
            select: { total: true }
          }
        },
        take: 10
      })
    ]);

    const customersWithStats = topCustomers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      totalOrders: customer.orders.length,
      totalSpent: customer.orders.reduce((sum, order) => sum + order.total, 0),
      joinedAt: customer.createdAt
    })).sort((a, b) => b.totalSpent - a.totalSpent);

    res.json({
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
      topCustomers: customersWithStats
    });
  } catch (error) {
    next(error);
  }
});

export default router;