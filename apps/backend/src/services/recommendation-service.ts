import { prisma } from '../lib/prisma';
import { computeMatchScore, RecommendationFactors } from '@awseen/utils';
import { RecommendationResponseSchema } from '@awseen/types';

export async function getRecommendationsForUser(userId: string) {
  const quiz = await prisma.quizAnswers.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  const products = await prisma.product.findMany({
    include: { images: true },
    take: 20
  });

  type ProductWithImages = (typeof products)[number];

  const recommendations = products.map((product: ProductWithImages) => {
    const factors: RecommendationFactors = {
      semanticSimilarity: Math.random(),
      budgetFit: Math.random(),
      discount: Number(product.discount ?? 0) / 100,
      rating: Number(product.rating ?? 0) / 5,
      shippingFit: 0.8
    };

    const score = computeMatchScore(factors);

    return {
      product: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: Number(product.price),
        currency: product.currency,
        category: product.category,
        rating: product.rating ? Number(product.rating) : undefined,
        url: product.url,
        badges: product.badges.map((badge: string) => badge.replace('_', ' ')),
        images: product.images.map((image: ProductWithImages['images'][number]) => ({
          url: image.url,
          alt: image.alt ?? undefined
        })),
        metadata: {
          discount: product.discount ? Number(product.discount) : undefined,
          seller: product.seller
        }
      },
      score,
      badges: product.badges.map((badge: string) => badge.replace('_', ' '))
    };
  });

  const payload = {
    recommendations,
    quiz: quiz
      ? {
          userId: quiz.userId,
          preferences: quiz.preferences,
          event: quiz.event,
          budgetMin: Number(quiz.budgetMin),
          budgetMax: Number(quiz.budgetMax),
          createdAt: quiz.createdAt
        }
      : undefined
  };

  return RecommendationResponseSchema.parse(payload);
}
