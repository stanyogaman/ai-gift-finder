'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { GiftCard, GiftCardProps } from '@/components/gifts/GiftCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

interface GiftResult extends GiftCardProps {}

export default function ResultsPage() {
  const t = useTranslations('results');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const answersParam = searchParams.get('answers');

  const [gifts, setGifts] = useState<GiftResult[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<GiftResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;

        if (sessionId) {
          // Fetch from saved session
          const response = await fetch(`/api/quiz/results?sessionId=${sessionId}`);
          if (!response.ok) throw new Error('Failed to fetch results');
          data = await response.json();
        } else if (answersParam) {
          // Parse answers from URL and generate results
          const answers = JSON.parse(decodeURIComponent(answersParam));
          const response = await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers, locale }),
          });
          if (!response.ok) throw new Error('Failed to generate results');
          data = await response.json();
        } else {
          // No session or answers - show demo results
          data = { gifts: getDemoGifts() };
        }

        setGifts(data.gifts || []);
        setFilteredGifts(data.gifts || []);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load gift recommendations');
        // Show demo gifts as fallback
        const demo = getDemoGifts();
        setGifts(demo);
        setFilteredGifts(demo);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId, answersParam, locale]);

  useEffect(() => {
    if (typeFilter === 'all') {
      setFilteredGifts(gifts);
    } else {
      setFilteredGifts(
        gifts.filter((gift) =>
          gift.tags.some((tag) => tag.toLowerCase().includes(typeFilter))
        )
      );
    }
  }, [typeFilter, gifts]);

  const handleFavoriteToggle = async (giftId: string) => {
    // TODO: Implement favorite toggle with API
    console.log('Toggle favorite:', giftId);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <h2 className="text-2xl font-bold">Finding your perfect gifts...</h2>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('title')}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* Affiliate Disclosure */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-center">
        <p className="text-sm text-amber-800">
          <AlertCircle className="inline h-4 w-4 mr-1" />
          {t('affiliateDisclosure')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{t('filterBy')}:</span>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allTypes')}</SelectItem>
              <SelectItem value="physical">{t('physical')}</SelectItem>
              <SelectItem value="experience">{t('experience')}</SelectItem>
              <SelectItem value="digital">{t('digital')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href="/quiz">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t('regenerate')}
          </Button>
        </Link>
      </div>

      {/* Results Grid */}
      {filteredGifts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{t('noResults')}</p>
          <Link href="/quiz">
            <Button variant="gradient">Take the Quiz Again</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              {...gift}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Want different recommendations?
        </p>
        <Link href="/quiz">
          <Button variant="gradient" size="lg">
            Take the Quiz Again
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Demo gifts for fallback/testing
function getDemoGifts(): GiftResult[] {
  return [
    {
      id: '1',
      title: 'Smart Reusable Notebook',
      description: 'Digitize notes instantly. Perfect for organized colleagues or students.',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=smart+reusable+notebook',
      merchant: 'Amazon',
      priceEstimate: 30,
      tags: ['tech', 'practical', 'office'],
      score: 85,
    },
    {
      id: '2',
      title: 'Specialty Coffee Subscription',
      description: 'Monthly delivery of hand-picked beans from roasters worldwide.',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=coffee+subscription',
      merchant: 'Various',
      priceEstimate: 45,
      tags: ['food', 'subscription', 'experience'],
      score: 78,
    },
    {
      id: '3',
      title: 'Premium Weighted Blanket',
      description: 'The ultimate cozy comfort to melt away stress.',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=weighted+blanket',
      merchant: 'Amazon',
      priceEstimate: 90,
      tags: ['wellness', 'cozy', 'home'],
      score: 72,
    },
    {
      id: '4',
      title: 'Portable Camping Hammock',
      description: 'Lightweight and durable for every outdoor adventurer.',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=camping+hammock',
      merchant: 'Amazon',
      priceEstimate: 60,
      tags: ['outdoor', 'travel', 'adventure'],
      score: 68,
    },
    {
      id: '5',
      title: 'DIY Pottery Kit',
      description: 'Unlock their inner artist with everything they need to sculpt.',
      imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=pottery+kit',
      merchant: 'Amazon',
      priceEstimate: 40,
      tags: ['creative', 'diy', 'art'],
      score: 65,
    },
    {
      id: '6',
      title: 'Noise-Cancelling Headphones',
      description: 'Immersive audio for music, podcasts, and calls.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=noise+cancelling+headphones',
      merchant: 'Amazon',
      priceEstimate: 150,
      tags: ['tech', 'audio', 'premium'],
      score: 82,
    },
    {
      id: '7',
      title: 'Luxury Spa Gift Set',
      description: 'Bath bombs, oils, and lotions for a spa-worthy ritual at home.',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop',
      productUrl: 'https://amazon.com/s?k=spa+gift+set',
      merchant: 'Amazon',
      priceEstimate: 65,
      tags: ['wellness', 'self-care', 'luxury'],
      score: 70,
    },
    {
      id: '8',
      title: 'MasterClass Annual Subscription',
      description: 'Learn from the worlds best. An inspiring, premium subscription.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop',
      productUrl: 'https://masterclass.com',
      merchant: 'MasterClass',
      priceEstimate: 180,
      tags: ['digital', 'learning', 'experience'],
      score: 75,
    },
  ];
}
