'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ExternalLink, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GiftCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  productUrl?: string;
  merchant?: string;
  priceEstimate?: number;
  tags: string[];
  score: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function GiftCard({
  id,
  title,
  description,
  imageUrl,
  productUrl,
  merchant,
  priceEstimate,
  tags,
  score,
  isFavorite = false,
  onFavoriteToggle,
}: GiftCardProps) {
  const t = useTranslations('results');
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = () => {
    setIsLiked(!isLiked);
    onFavoriteToggle?.(id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-slate-400';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Gift idea: ${title}`,
          text: description,
          url: productUrl || window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const placeholderImage = `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop`;

  return (
    <Card className="gift-card overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={imageError ? placeholderImage : imageUrl || placeholderImage}
          alt={title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        {/* Score badge */}
        {score > 0 && (
          <div
            className={cn(
              'absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white',
              getScoreColor(score)
            )}
          >
            {t('matchScore', { score })}
          </div>
        )}
        {/* Merchant badge */}
        {merchant && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 text-xs font-medium">
            {merchant}
          </div>
        )}
      </div>

      <CardContent className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            {priceEstimate && (
              <p className="text-xl font-bold text-purple-600">
                ${priceEstimate}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-9 w-9"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className={cn('h-9 w-9', isLiked && 'text-pink-500')}
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
            </Button>
          </div>
        </div>

        {/* View Gift Button */}
        <a
          href={productUrl || `https://www.amazon.com/s?k=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3"
        >
          <Button variant="default" className="w-full gap-2">
            {t('viewGift')}
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
