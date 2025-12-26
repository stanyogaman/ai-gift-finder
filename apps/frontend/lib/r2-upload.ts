// R2 Image Upload Utility
// Server-side utility for uploading images to Cloudflare R2

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { R2_CONFIG } from './r2-config';

/**
 * Initialize R2 Client using AWS S3 SDK
 * Cloudflare R2 is S3-compatible
 */
export function createR2Client() {
  return new S3Client({
    region: R2_CONFIG.region,
    endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_CONFIG.accessKeyId,
      secretAccessKey: R2_CONFIG.secretAccessKey,
    },
  });
}

/**
 * Upload image to R2
 * @param file - File buffer or blob
 * @param path - Destination path in R2 (e.g., 'products/room-divider-1.jpg')
 * @param contentType - MIME type (e.g., 'image/jpeg')
 * @returns URL of uploaded image
 */
export async function uploadImageToR2(
  file: Buffer | Blob,
  path: string,
  contentType: string = 'image/jpeg'
): Promise<string> {
  const client = createR2Client();

  const command = new PutObjectCommand({
    Bucket: R2_CONFIG.bucketName,
    Key: path,
    Body: file instanceof Blob ? Buffer.from(await file.arrayBuffer()) : file,
    ContentType: contentType,
    // Make publicly accessible
    ACL: 'public-read',
  });

  await client.send(command);

  // Return the public URL
  return `${R2_CONFIG.publicUrl}/${path}`;
}

/**
 * Delete image from R2
 * @param path - Path to the image in R2
 */
export async function deleteImageFromR2(path: string): Promise<void> {
  const client = createR2Client();

  const command = new DeleteObjectCommand({
    Bucket: R2_CONFIG.bucketName,
    Key: path,
  });

  await client.send(command);
}

/**
 * Generate unique filename
 * @param originalName - Original filename
 * @param prefix - Optional prefix (e.g., 'product', 'project')
 * @returns Unique filename with timestamp
 */
export function generateUniqueFilename(originalName: string, prefix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split('.').pop();
  const sanitizedName = originalName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-');

  if (prefix) {
    return `${prefix}-${timestamp}-${random}.${extension}`;
  }

  return `${timestamp}-${random}-${sanitizedName}`;
}

/**
 * Allowed image types
 */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

/**
 * Maximum file size (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Validate image file
 * @param file - File to validate
 * @returns true if valid, error message if invalid
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}
