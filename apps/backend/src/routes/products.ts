import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  category: z.string(),
  rating: z.number().min(0).max(5).optional(),
  url: z.string().url(),
  badges: z.array(z.string()).default([]),
  images: z.array(z.object({ url: z.string().url(), alt: z.string().optional() })).default([])
});

router.get('/', async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({ include: { images: true }, orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate(['ADMIN']), async (req, res, next) => {
  try {
    const payload = productSchema.parse(req.body);
    const product = await prisma.product.create({
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        currency: payload.currency,
        category: payload.category,
        rating: payload.rating,
        url: payload.url,
        badges: payload.badges.map((badge) => badge.replace(' ', '_')),
        images: {
          create: payload.images.map((image) => ({ url: image.url, alt: image.alt }))
        }
      },
      include: { images: true }
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
