'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/lib/i18n/navigation';
import { History, Calendar, Gift, Loader2, ArrowRight } from 'lucide-react';

interface QuizSession {
  id: string;
  createdAt: string;
  relationship: string;
  occasion: string;
  tags: string[];
}

export default function HistoryPage() {
  const t = useTranslations('account');
  const locale = useLocale();
  const router = useRouter();
  const { user, loading, getToken } = useAuth();

  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        const response = await fetch('/api/account/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data.sessions || []);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user, getToken]);

  if (loading || isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <History className="h-8 w-8 text-purple-500" />
        <h1 className="text-3xl font-bold">{t('quizHistory')}</h1>
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{t('noHistory')}</h2>
            <p className="text-muted-foreground mb-6">
              Take your first quiz to get personalized gift recommendations!
            </p>
            <Link href="/quiz">
              <Button variant="gradient">{t('startQuiz')}</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(session.createdAt).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <h3 className="font-semibold mb-2">
                      Gift for {session.relationship} - {session.occasion}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {session.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link href={`/results?sessionId=${session.id}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {t('viewResults')}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/quiz">
          <Button variant="gradient">Take New Quiz</Button>
        </Link>
      </div>
    </div>
  );
}
