import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/overview', authenticate(['ADMIN']), async (_req, res, next) => {
  try {
    const [users, partners, products, conversions] = await Promise.all([
      prisma.user.count(),
      prisma.partner.count(),
      prisma.product.count(),
      prisma.conversion.count()
    ]);

    res.json({ users, partners, products, conversions });
  } catch (error) {
    next(error);
  }
});

router.get('/ai-logs', authenticate(['ADMIN']), async (_req, res, next) => {
  try {
    const logs = await prisma.aiLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

export default router;
