// Cloudflare R2 Configuration
// This file contains utilities for working with Cloudflare R2 storage

/**
 * R2 Configuration
 * Set these in your .env.local file:
 *
 * R2_ACCOUNT_ID=your-cloudflare-account-id
 * R2_ACCESS_KEY_ID=your-r2-access-key-id
 * R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
 * R2_BUCKET_NAME=atelier-samui-media
 * NEXT_PUBLIC_R2_PUBLIC_URL=https://media.atelier-samui.com
 */

export const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID || '',
  accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  bucketName: process.env.R2_BUCKET_NAME || 'atelier-samui-media',
  publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '',
  region: 'auto', // R2 uses 'auto' region
};

/**
 * Get the full URL for an R2 image
 * @param path - The path to the image in R2 (e.g., 'products/room-divider-1.jpg')
 * @returns Full public URL to the image
 */
export function getR2ImageUrl(path: string): string {
  if (!path) return '';

  // If it's already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Return full R2 URL
  return `${R2_CONFIG.publicUrl}/${cleanPath}`;
}

/**
 * Image categories for organizing R2 storage
 */
export const IMAGE_CATEGORIES = {
  PRODUCTS: 'products',
  PROJECTS: 'projects',
  HERO: 'hero',
  GALLERY: 'gallery',
  TEAM: 'team',
} as const;

/**
 * Get optimized image URL with transformations (if using Cloudflare Images)
 * @param path - The path to the image
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  path: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  }
): string {
  const baseUrl = getR2ImageUrl(path);

  if (!options) return baseUrl;

  // If using Cloudflare Images with transformations, add parameters
  // For basic R2, you might use a CDN with image optimization
  // This is a placeholder for when you set up transformations

  return baseUrl;
}

/**
 * Image path helpers for different categories
 */
export const R2_PATHS = {
  // Product images
  productImage: (filename: string) => `${IMAGE_CATEGORIES.PRODUCTS}/${filename}`,

  // Project portfolio images
  projectImage: (filename: string) => `${IMAGE_CATEGORIES.PROJECTS}/${filename}`,

  // Hero/banner images
  heroImage: (filename: string) => `${IMAGE_CATEGORIES.HERO}/${filename}`,

  // Gallery images
  galleryImage: (filename: string) => `${IMAGE_CATEGORIES.GALLERY}/${filename}`,

  // Team photos
  teamImage: (filename: string) => `${IMAGE_CATEGORIES.TEAM}/${filename}`,
};

/**
 * Placeholder images for development
 * Replace these with your actual R2 URLs after uploading
 */
export const PLACEHOLDER_IMAGES = {
  productCard: '/images/placeholder-product.jpg',
  hero: '/images/placeholder-hero.jpg',
  project: '/images/placeholder-project.jpg',
  team: '/images/placeholder-team.jpg',
};
