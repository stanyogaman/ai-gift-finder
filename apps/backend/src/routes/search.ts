import { Router } from 'express';
import { z } from 'zod';
import { amazonSearchService } from '../services/amazon-search-service';

const router = Router();

const searchSchema = z.object({
  query: z.string().min(1),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  category: z.string().optional(),
  primeOnly: z.boolean().optional(),
  minRating: z.number().min(1).max(5).optional(),
  sortBy: z.enum(['relevance', 'price-low', 'price-high', 'rating', 'reviews']).optional(),
  limit: z.number().min(1).max(100).optional()
});

// Search Amazon products
router.get('/amazon', async (req, res, next) => {
  try {
    const params = searchSchema.parse({
      query: req.query.query,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      category: req.query.category,
      primeOnly: req.query.primeOnly === 'true',
      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
      sortBy: req.query.sortBy,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    });

    const results = await amazonSearchService.searchProducts(params);
    res.json({ results, count: results.length });
  } catch (error) {
    next(error);
  }
});

// Get best deals in category
router.get('/amazon/deals/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const results = await amazonSearchService.getBestDeals(category, limit);
    res.json({ results, count: results.length });
  } catch (error) {
    next(error);
  }
});

// Get product price tracking
router.get('/amazon/price/:asin', async (req, res, next) => {
  try {
    const { asin } = req.params;
    const priceData = await amazonSearchService.trackProductPrice(asin);
    res.json(priceData);
  } catch (error) {
    next(error);
  }
});

// Get recommendations based on quiz data
router.post('/amazon/recommendations', async (req, res, next) => {
  try {
    const quizData = req.body;

    const results = await amazonSearchService.getRecommendationsForQuiz(quizData);
    res.json({ recommendations: results, count: results.length });
  } catch (error) {
    next(error);
  }
});

export default router;
