import { GiftTemplate } from '@prisma/client';

interface QuizAnswers {
  [key: string]: string | string[];
}

interface ScoredGift extends GiftTemplate {
  score: number;
}

const QUESTION_WEIGHTS: Record<string, number> = {
  relationship: 15,
  occasion: 18,
  age: 8,
  personality: 16,
  interests: 24,
  emotion: 14,
  budget: 12,
  giftType: 10,
  closeness: 8,
};

const TAG_MAPPINGS: Record<string, string[]> = {
  // Personality mappings
  introvert: ['cozy', 'books', 'home', 'self-care', 'solo'],
  extrovert: ['social', 'party', 'experience', 'group'],
  creative: ['art', 'diy', 'crafts', 'design', 'music'],
  practical: ['useful', 'functional', 'everyday', 'tools'],
  'tech-lover': ['tech', 'gadgets', 'smart', 'electronics'],
  minimalist: ['minimal', 'simple', 'quality', 'essential'],
  sentimental: ['personalized', 'memories', 'keepsake', 'nostalgic'],
  adventurous: ['travel', 'outdoor', 'adventure', 'experience'],

  // Interest mappings
  tech: ['gadgets', 'electronics', 'smart', 'tech'],
  books: ['reading', 'literature', 'kindle', 'audiobook'],
  fitness: ['workout', 'sports', 'gym', 'active', 'health'],
  cooking: ['kitchen', 'culinary', 'gourmet', 'food'],
  travel: ['luggage', 'adventure', 'experiences', 'outdoor'],
  art: ['creative', 'artistic', 'design', 'craft'],
  gaming: ['games', 'console', 'pc', 'entertainment'],
  beauty: ['skincare', 'spa', 'wellness', 'self-care'],
  sustainability: ['eco', 'sustainable', 'green', 'organic'],
  diy: ['craft', 'maker', 'tools', 'projects'],
  music: ['audio', 'instrument', 'concert', 'vinyl'],
  gardening: ['plants', 'outdoor', 'nature', 'garden'],

  // Emotion mappings
  thoughtful: ['meaningful', 'personalized', 'special', 'heartfelt'],
  funny: ['humorous', 'fun', 'quirky', 'gag'],
  luxurious: ['luxury', 'premium', 'high-end', 'indulgent'],
  surprise: ['unique', 'unexpected', 'wow', 'special'],

  // Gift type mappings
  physical: ['product', 'item', 'tangible'],
  experience: ['experiential', 'activity', 'event', 'class'],
  digital: ['online', 'subscription', 'digital', 'app'],
};

function expandTags(value: string): string[] {
  const expanded = TAG_MAPPINGS[value] || [];
  return [value, ...expanded];
}

function parseBudget(budgetValue: string): { min: number; max: number } {
  switch (budgetValue) {
    case 'under-25':
      return { min: 0, max: 25 };
    case '25-50':
      return { min: 25, max: 50 };
    case '50-100':
      return { min: 50, max: 100 };
    case '100-plus':
      return { min: 100, max: 500 };
    default:
      return { min: 0, max: 100 };
  }
}

export function scoreGiftTemplate(gift: GiftTemplate, answers: QuizAnswers): number {
  let score = 0;

  // Score based on tags matching
  Object.entries(answers).forEach(([questionId, value]) => {
    const weight = QUESTION_WEIGHTS[questionId] || 5;
    const values = Array.isArray(value) ? value : [value];

    values.forEach((v) => {
      const expandedTags = expandTags(v);
      const matchCount = expandedTags.filter(
        (tag) =>
          gift.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
          gift.occasionTags.some((t) => t.toLowerCase().includes(tag.toLowerCase())) ||
          gift.relationshipTags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      ).length;

      score += matchCount * weight;
    });
  });

  // Score based on relationship match
  const relationship = answers.relationship as string;
  if (relationship && gift.relationshipTags.includes(relationship)) {
    score += 20;
  }

  // Score based on occasion match
  const occasion = answers.occasion as string;
  if (occasion && gift.occasionTags.includes(occasion)) {
    score += 20;
  }

  // Add profitability bonus (small weight to prefer profitable items when scores are equal)
  score += gift.profitabilityScore * 2;

  return Math.min(100, Math.round(score));
}

export function filterByBudget(gifts: ScoredGift[], budgetValue: string): ScoredGift[] {
  const { min, max } = parseBudget(budgetValue);

  return gifts.filter((gift) => {
    const giftMin = gift.minPrice || 0;
    const giftMax = gift.maxPrice || 1000;

    // Gift is in budget if there's any overlap
    return giftMin <= max && giftMax >= min;
  });
}

export function buildRecommendations(
  templates: GiftTemplate[],
  answers: QuizAnswers,
  limit: number = 12
): ScoredGift[] {
  // Score all templates
  const scored: ScoredGift[] = templates
    .filter((t) => t.isActive)
    .map((template) => ({
      ...template,
      score: scoreGiftTemplate(template, answers),
    }));

  // Filter by budget if specified
  const budgetValue = answers.budget as string;
  const filtered = budgetValue ? filterByBudget(scored, budgetValue) : scored;

  // Sort by score (descending) and return top results
  return filtered.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function deriveTags(answers: QuizAnswers): string[] {
  const tags: string[] = [];

  Object.entries(answers).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];
    values.forEach((v) => {
      if (v && typeof v === 'string' && v.trim()) {
        tags.push(`${key}:${v}`);
        // Also add expanded tags
        const expanded = TAG_MAPPINGS[v];
        if (expanded) {
          expanded.forEach((t) => tags.push(t));
        }
      }
    });
  });

  return [...new Set(tags)];
}
