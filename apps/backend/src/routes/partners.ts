import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

const feedSchema = z.object({
  url: z.string().url(),
  format: z.enum(['CSV', 'JSON', 'API'])
});

router.get('/integrations', authenticate(['PARTNER', 'ADMIN']), async (req, res, next) => {
  try {
    const partner = await prisma.partner.findUnique({
      where: { userId: req.user!.id },
      include: { credentials: true }
    });

    res.json(partner);
  } catch (error) {
    next(error);
  }
});

router.post('/feeds', authenticate(['PARTNER', 'ADMIN']), async (req, res, next) => {
  try {
    const payload = feedSchema.parse(req.body);
    res.status(202).json({
      message: 'Feed ingestion scheduled',
      payload
    });
  } catch (error) {
    next(error);
  }
});

export default router;
