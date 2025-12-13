'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { GiftCard, GiftCardProps } from '@/components/gifts/GiftCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { Heart, Loader2, Gift } from 'lucide-react';

export default function FavoritesPage() {
  const t = useTranslations('account');
  const router = useRouter();
  const { user, loading, getToken } = useAuth();

  const [favorites, setFavorites] = useState<GiftCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        const response = await fetch('/api/account/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites || []);
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user, getToken]);

  const handleRemoveFavorite = async (giftId: string) => {
    try {
      const token = await getToken();
      await fetch(`/api/account/favorites/${giftId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(favorites.filter((f) => f.id !== giftId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-pink-500" />
        <h1 className="text-3xl font-bold">{t('favorites')}</h1>
      </div>

      {favorites.length === 0 ? (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('noFavorites')}</h2>
            <p className="text-muted-foreground mb-6">
              Browse gift recommendations and tap the heart icon to save your favorites!
            </p>
            <Link href="/quiz">
              <Button variant="gradient">{t('startQuiz')}</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <p className="text-muted-foreground mb-8">
            You have saved {favorites.length} gift{favorites.length !== 1 ? 's' : ''}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((gift) => (
              <GiftCard
                key={gift.id}
                {...gift}
                isFavorite={true}
                onFavoriteToggle={handleRemoveFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
