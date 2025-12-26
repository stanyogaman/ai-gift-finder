import Image from 'next/image';
import { getR2ImageUrl, getOptimizedImageUrl } from '@/lib/r2-config';

interface R2ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * R2Image Component
 * Automatically handles Cloudflare R2 URLs and image optimization
 *
 * Usage:
 * <R2Image
 *   src="products/room-divider-1.jpg"
 *   alt="Room divider"
 *   width={800}
 *   height={600}
 * />
 */
export function R2Image({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  fill = false,
  sizes,
  objectFit = 'cover',
}: R2ImageProps) {
  // Get the full R2 URL
  const imageUrl = getR2ImageUrl(src);

  // If no URL is configured, show placeholder
  if (!imageUrl || imageUrl === '/') {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
        }}
      >
        <span className="text-sm text-muted-foreground">
          {alt || 'Image placeholder'}
        </span>
      </div>
    );
  }

  // Common Next.js Image props
  const commonProps = {
    src: imageUrl,
    alt,
    className,
    priority,
    quality,
  };

  if (fill) {
    return (
      <Image
        {...commonProps}
        fill
        sizes={sizes}
        style={{ objectFit }}
      />
    );
  }

  return (
    <Image
      {...commonProps}
      width={width}
      height={height}
      style={{ objectFit }}
    />
  );
}

/**
 * Background Image Component using R2
 */
export function R2BackgroundImage({
  src,
  alt,
  className = '',
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const imageUrl = getR2ImageUrl(src);

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="img"
      aria-label={alt}
    >
      {children}
    </div>
  );
}
