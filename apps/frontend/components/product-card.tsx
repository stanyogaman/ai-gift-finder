import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@awseen/ui';
import { formatCurrency, resolveBadgeColor, truncate } from '@awseen/utils';
import type { Product } from '@awseen/types';

export type ProductCardProps = {
  product: Product;
  score: number;
};

export function ProductCard({ product, score }: ProductCardProps) {
  const primaryImage = product.images?.[0];
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-semibold">
            {product.title}
          </CardTitle>
          <span className="icon-badge">{Math.round(score * 100)}% match</span>
        </div>
        <CardDescription>{truncate(product.description, 160)}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <Badge key={badge} className={resolveBadgeColor(badge)} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {primaryImage ? (
          <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
            <Image src={primaryImage.url} alt={primaryImage.alt ?? product.title} fill className="object-cover" />
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{formatCurrency(product.price, product.currency)}</div>
          {product.metadata?.discount ? (
            <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-300">
              {product.metadata.discount}% off
            </span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={product.url} target="_blank" rel="noopener noreferrer">
            View product
          </Link>
        </Button>
        <Button variant="secondary">Save</Button>
      </CardFooter>
    </Card>
  );
}
