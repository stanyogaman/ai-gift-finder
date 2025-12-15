/**
 * Amazon Product Search Service
 *
 * This service provides enhanced product search capabilities using:
 * 1. Google Programmable Search API for finding Amazon products
 * 2. Product data enrichment
 * 3. Price and deal tracking
 * 4. Review aggregation
 */

interface AmazonProduct {
  asin?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  url: string;
  imageUrl: string;
  category: string;
  isPrime: boolean;
  discount?: number;
  features?: string[];
}

interface SearchParams {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  primeOnly?: boolean;
  minRating?: number;
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'reviews';
  limit?: number;
}

export class AmazonSearchService {
  private googleSearchApiKey: string;
  private googleSearchEngineId: string;

  constructor() {
    this.googleSearchApiKey = process.env.GOOGLE_SEARCH_API_KEY || '';
    this.googleSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID || '';
  }

  /**
   * Search for Amazon products based on criteria
   */
  async searchProducts(params: SearchParams): Promise<AmazonProduct[]> {
    try {
      // Build search query
      let searchQuery = `${params.query} site:amazon.com`;

      if (params.category) {
        searchQuery += ` ${params.category}`;
      }

      if (params.primeOnly) {
        searchQuery += ' Prime';
      }

      // Add price range to query if specified
      if (params.minPrice || params.maxPrice) {
        const priceRange = this.formatPriceRange(params.minPrice, params.maxPrice);
        searchQuery += ` ${priceRange}`;
      }

      // In production, this would call Google Programmable Search API
      // For now, return mock enriched results
      const mockResults = this.generateMockResults(params);

      // Filter and sort results
      let results = this.filterResults(mockResults, params);
      results = this.sortResults(results, params.sortBy || 'relevance');

      // Limit results
      const limit = params.limit || 20;
      return results.slice(0, limit);
    } catch (error) {
      console.error('Amazon search error:', error);
      throw new Error('Failed to search Amazon products');
    }
  }

  /**
   * Get product recommendations based on quiz answers
   */
  async getRecommendationsForQuiz(quizData: {
    preferences: string[];
    event: string;
    budgetMin: number;
    budgetMax: number;
    recipientAge?: string;
    recipientInterests?: string[];
  }): Promise<AmazonProduct[]> {
    // Build comprehensive search query from quiz data
    const queries = this.buildSearchQueriesFromQuiz(quizData);

    // Search for each query and aggregate results
    const allResults: AmazonProduct[] = [];

    for (const query of queries) {
      const results = await this.searchProducts({
        query,
        minPrice: quizData.budgetMin,
        maxPrice: quizData.budgetMax,
        minRating: 4.0,
        sortBy: 'rating',
        limit: 10
      });
      allResults.push(...results);
    }

    // Remove duplicates and rank by relevance
    const uniqueResults = this.deduplicateResults(allResults);
    return this.rankByRelevance(uniqueResults, quizData);
  }

  /**
   * Track price history and deals
   */
  async trackProductPrice(asin: string): Promise<{
    currentPrice: number;
    historicalLow: number;
    historicalHigh: number;
    averagePrice: number;
    isGoodDeal: boolean;
  }> {
    // This would integrate with price tracking APIs or database
    // Mock implementation
    return {
      currentPrice: 99.99,
      historicalLow: 79.99,
      historicalHigh: 129.99,
      averagePrice: 104.99,
      isGoodDeal: true
    };
  }

  /**
   * Get best deals in category
   */
  async getBestDeals(category: string, limit: number = 10): Promise<AmazonProduct[]> {
    const results = await this.searchProducts({
      query: `${category} best deals discount`,
      primeOnly: true,
      minRating: 4.0,
      sortBy: 'relevance',
      limit: limit * 2 // Get more to filter
    });

    // Filter for actual good deals (discount > 20%)
    return results
      .filter(p => (p.discount || 0) > 20)
      .slice(0, limit);
  }

  // Helper methods

  private buildSearchQueriesFromQuiz(quizData: any): string[] {
    const queries: string[] = [];

    // Combine preferences with event
    if (quizData.preferences && quizData.preferences.length > 0) {
      const topPreferences = quizData.preferences.slice(0, 3);
      queries.push(`${topPreferences.join(' ')} gift for ${quizData.event}`);

      // Individual preference queries
      topPreferences.forEach(pref => {
        queries.push(`${pref} ${quizData.event} gift`);
      });
    }

    // Age-specific queries
    if (quizData.recipientAge) {
      queries.push(`${quizData.recipientAge} ${quizData.event} gift ideas`);
    }

    // Interest-based queries
    if (quizData.recipientInterests && quizData.recipientInterests.length > 0) {
      quizData.recipientInterests.forEach(interest => {
        queries.push(`${interest} enthusiast gift`);
      });
    }

    return queries.slice(0, 5); // Limit to top 5 queries
  }

  private formatPriceRange(minPrice?: number, maxPrice?: number): string {
    if (!minPrice && !maxPrice) return '';

    if (minPrice && maxPrice) {
      return `$${minPrice}-$${maxPrice}`;
    } else if (minPrice) {
      return `over $${minPrice}`;
    } else {
      return `under $${maxPrice}`;
    }
  }

  private filterResults(results: AmazonProduct[], params: SearchParams): AmazonProduct[] {
    return results.filter(product => {
      // Filter by price range
      if (params.minPrice && product.price < params.minPrice) return false;
      if (params.maxPrice && product.price > params.maxPrice) return false;

      // Filter by rating
      if (params.minRating && product.rating < params.minRating) return false;

      // Filter by Prime
      if (params.primeOnly && !product.isPrime) return false;

      // Filter by category
      if (params.category && !product.category.toLowerCase().includes(params.category.toLowerCase())) {
        return false;
      }

      return true;
    });
  }

  private sortResults(results: AmazonProduct[], sortBy: string): AmazonProduct[] {
    const sorted = [...results];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'relevance':
      default:
        // Keep original order (search relevance)
        break;
    }

    return sorted;
  }

  private deduplicateResults(results: AmazonProduct[]): AmazonProduct[] {
    const seen = new Set<string>();
    return results.filter(product => {
      const key = product.asin || product.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private rankByRelevance(results: AmazonProduct[], quizData: any): AmazonProduct[] {
    // Score each product based on quiz preferences
    const scored = results.map(product => {
      let score = 0;

      // Higher rating = higher score
      score += product.rating * 10;

      // More reviews = more confidence
      score += Math.min(product.reviewCount / 100, 10);

      // Prime products get bonus
      if (product.isPrime) score += 5;

      // Discounts get bonus
      if (product.discount) score += product.discount / 5;

      // Match preferences in title/description
      if (quizData.preferences) {
        quizData.preferences.forEach(pref => {
          const prefLower = pref.toLowerCase();
          if (product.title.toLowerCase().includes(prefLower)) score += 15;
          if (product.description.toLowerCase().includes(prefLower)) score += 5;
        });
      }

      return { product, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    return scored.map(item => item.product);
  }

  private generateMockResults(params: SearchParams): AmazonProduct[] {
    // Generate realistic mock data for development
    const categories = ['Electronics', 'Home & Kitchen', 'Books', 'Toys & Games', 'Sports & Outdoors'];
    const mockProducts: AmazonProduct[] = [];

    for (let i = 0; i < 20; i++) {
      const price = (Math.random() * (params.maxPrice || 500) + (params.minPrice || 10));
      const rating = 3.5 + Math.random() * 1.5;
      const reviewCount = Math.floor(Math.random() * 5000);
      const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 40) : undefined;

      mockProducts.push({
        asin: `B${String(Math.floor(Math.random() * 100000000)).padStart(9, '0')}`,
        title: `${params.query} - Product ${i + 1}`,
        description: `High-quality ${params.query} with excellent features and customer reviews.`,
        price: Math.round(price * 100) / 100,
        currency: 'USD',
        rating: Math.round(rating * 10) / 10,
        reviewCount,
        url: `https://amazon.com/dp/MOCK${i}`,
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}`,
        category: categories[i % categories.length],
        isPrime: Math.random() > 0.3,
        discount,
        features: [
          'High-quality construction',
          'Excellent customer reviews',
          'Fast shipping available',
          'Great value for money'
        ]
      });
    }

    return mockProducts;
  }
}

export const amazonSearchService = new AmazonSearchService();
