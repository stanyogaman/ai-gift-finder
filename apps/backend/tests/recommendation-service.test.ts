import { prisma } from '../src/lib/prisma';
import { getRecommendationsForUser } from '../src/services/recommendation-service';

jest.mock('../src/lib/prisma', () => {
  const quizAnswers = {
    findFirst: jest.fn()
  };
  const product = {
    findMany: jest.fn()
  };
  return { prisma: { quizAnswers, product } };
});

describe('getRecommendationsForUser', () => {
  const quiz = { userId: 'user-1', preferences: ['Eco'], event: 'Birthday', budgetMin: 10, budgetMax: 100, createdAt: new Date() };
  const products = [
    {
      id: 'prod-1',
      title: 'Product 1',
      description: 'Description',
      price: 100,
      currency: 'USD',
      category: 'Category',
      rating: 4,
      url: 'https://example.com',
      badges: ['ECO_PICK'],
      discount: 10,
      seller: 'Seller',
      images: [{ url: 'https://example.com/image.jpg', alt: 'Alt' }]
    }
  ];

  beforeEach(() => {
    (prisma.quizAnswers.findFirst as jest.Mock).mockResolvedValue(quiz);
    (prisma.product.findMany as jest.Mock).mockResolvedValue(products);
  });

  it('returns recommendations with computed scores', async () => {
    const response = await getRecommendationsForUser('user-1');
    expect(response.recommendations).toHaveLength(1);
    expect(response.recommendations[0].product.title).toEqual('Product 1');
    expect(response.recommendations[0].score).toBeGreaterThan(0);
    expect(response.quiz?.userId).toEqual('user-1');
  });
});
