import type { RecommendationResponse } from '@awseen/types';

export const mockProducts: RecommendationResponse['recommendations'] = [
  {
    score: 0.91,
    badges: ['Top Match', 'Best Deal'],
    product: {
      id: 'prod-1',
      title: 'Eco-friendly Smart Mug',
      description:
        'Self-heating ceramic mug with adaptive temperature control and a minimal bamboo charging plate. Perfect for remote workers and mindful sippers.',
      price: 129,
      currency: 'USD',
      category: 'Home & Lifestyle',
      rating: 4.7,
      url: 'https://example.com/products/eco-mug',
      badges: ['Eco Pick', 'Top Match'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907',
          alt: 'Eco-friendly smart mug'
        }
      ],
      metadata: {
        discount: 15,
        shipping: '2-day',
        seller: 'Awseen Preferred'
      }
    }
  },
  {
    score: 0.86,
    badges: ['Premium Choice'],
    product: {
      id: 'prod-2',
      title: 'AI-powered Vinyl Turntable',
      description:
        'Hi-fi turntable that blends analog richness with AI-assisted tonearm calibration, built-in streamer and multi-room audio.',
      price: 649,
      currency: 'USD',
      category: 'Audio',
      rating: 4.9,
      url: 'https://example.com/products/ai-turntable',
      badges: ['Premium Choice'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
          alt: 'Premium turntable'
        }
      ],
      metadata: {
        discount: 5,
        shipping: 'Express',
        seller: 'Vinyl Labs'
      }
    }
  },
  {
    score: 0.8,
    badges: ['Best Deal'],
    product: {
      id: 'prod-3',
      title: 'Travel-sized AI Projector',
      description:
        'Pocketable projector with auto-keystone, Gemini-powered scene detection and real-time subtitle translation.',
      price: 399,
      currency: 'USD',
      category: 'Gadgets',
      rating: 4.5,
      url: 'https://example.com/products/ai-projector',
      badges: ['Best Deal'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
          alt: 'Travel projector'
        }
      ],
      metadata: {
        discount: 20,
        shipping: 'Standard',
        seller: 'Nomad Gear'
      }
    }
  }
];
