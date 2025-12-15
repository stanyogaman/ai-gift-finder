import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false)
});

// Get all published articles (public)
router.get('/', async (req, res, next) => {
  try {
    const { tag, limit = '20', offset = '0' } = req.query;

    const where: any = { published: true };
    if (tag) {
      where.tags = { has: tag };
    }

    const articles = await prisma.article.findMany({
      where,
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        seoDescription: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.json(articles);
  } catch (error) {
    next(error);
  }
});

// Get single article by slug (public)
router.get('/:slug', async (req, res, next) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: {
          select: {
            user: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (!article.published) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Create article (admin only)
router.post('/', authenticate({ requireAdmin: true }), async (req, res, next) => {
  try {
    const payload = articleSchema.parse(req.body);

    // Check if slug already exists
    const existing = await prisma.article.findUnique({
      where: { slug: payload.slug }
    });

    if (existing) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const article = await prisma.article.create({
      data: {
        ...payload,
        authorId: req.user!.id
      }
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

// Update article (admin only)
router.put('/:id', authenticate({ requireAdmin: true }), async (req, res, next) => {
  try {
    const payload = articleSchema.partial().parse(req.body);

    // If slug is being changed, check if new slug exists
    if (payload.slug) {
      const existing = await prisma.article.findFirst({
        where: {
          slug: payload.slug,
          NOT: { id: req.params.id }
        }
      });

      if (existing) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
    }

    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: {
        ...payload,
        updatedAt: new Date()
      }
    });

    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Delete article (admin only)
router.delete('/:id', authenticate({ requireAdmin: true }), async (req, res, next) => {
  try {
    await prisma.article.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get all tags (public)
router.get('/meta/tags', async (req, res, next) => {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { tags: true }
    });

    const allTags = articles.flatMap(a => a.tags);
    const uniqueTags = [...new Set(allTags)];

    // Count articles per tag
    const tagCounts = uniqueTags.map(tag => ({
      tag,
      count: allTags.filter(t => t === tag).length
    })).sort((a, b) => b.count - a.count);

    res.json(tagCounts);
  } catch (error) {
    next(error);
  }
});

export default router;
