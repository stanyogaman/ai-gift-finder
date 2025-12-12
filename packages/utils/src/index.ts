import { clsx, type ClassValue } from 'clsx';

export type BudgetRange = {
  min: number;
  max: number;
};

export type RecommendationFactors = {
  semanticSimilarity: number; // 0-1
  budgetFit: number; // 0-1
  discount: number; // 0-1
  rating: number; // 0-1
  shippingFit: number; // 0-1
};

export const cn = (...inputs: ClassValue[]) => clsx(...inputs);

export const clampScore = (value: number) => Math.max(0, Math.min(1, value));

export const computeMatchScore = (factors: RecommendationFactors) => {
  const score =
    0.4 * clampScore(factors.semanticSimilarity) +
    0.2 * clampScore(factors.budgetFit) +
    0.15 * clampScore(factors.discount) +
    0.15 * clampScore(factors.rating) +
    0.1 * clampScore(factors.shippingFit);
  return Number(score.toFixed(4));
};

export const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(value);

export const sanitizeUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.toString();
  } catch (error) {
    return '';
  }
};

export const resolveBadgeColor = (badge: string) => {
  const normalized = badge.toLowerCase();
  if (normalized.includes('eco')) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300';
  if (normalized.includes('deal')) return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300';
  if (normalized.includes('premium')) return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300';
  return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300';
};

export const truncate = (value: string, length = 140) =>
  value.length > length ? `${value.slice(0, length - 1)}…` : value;
