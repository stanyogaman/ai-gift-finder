import { z } from 'zod';

export const BadgeSchema = z.enum(['Eco Pick', 'Top Match', 'Best Deal', 'Premium Choice', 'Hot Deal', 'Best Value']);

export const ProductImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional()
});

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  category: z.string(),
  rating: z.number().min(0).max(5).optional(),
  url: z.string().url(),
  badges: z.array(z.string()).default([]),
  images: z.array(ProductImageSchema),
  metadata: z.record(z.any()).optional()
});

export const QuizAnswerSchema = z.object({
  userId: z.string(),
  preferences: z.array(z.string()),
  event: z.string(),
  budgetMin: z.number().nonnegative().default(0),
  budgetMax: z.number().positive(),
  createdAt: z.date().optional()
});

export const RecommendationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  score: z.number().min(0).max(1),
  factors: z.record(z.number()),
  createdAt: z.date().optional()
});

export const RecommendationResponseSchema = z.object({
  recommendations: z.array(
    z.object({
      product: ProductSchema,
      score: z.number().min(0).max(1),
      badges: z.array(z.string()).default([])
    })
  ),
  quiz: QuizAnswerSchema.optional()
});

export type Product = z.infer<typeof ProductSchema>;
export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type RecommendationResponse = z.infer<typeof RecommendationResponseSchema>;
