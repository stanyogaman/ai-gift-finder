'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from '@/lib/i18n/navigation';
import { User, Heart, History, Settings, Loader2 } from 'lucide-react';

export default function AccountPage() {
  const t = useTranslations('account');
  const locale = useLocale();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [preferences, setPreferences] = useState({
    language: locale,
    marketingConsent: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  const handleLanguageChange = (value: string) => {
    setPreferences({ ...preferences, language: value });
    router.replace('/account', { locale: value as 'en' | 'ru' });
  };

  const handleMarketingToggle = (checked: boolean) => {
    setPreferences({ ...preferences, marketingConsent: checked });
    // TODO: Save to database
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-20 w-20 rounded-full mx-auto mb-4"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                )}
                <h2 className="font-semibold">{user.displayName || 'User'}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  {t('profile')}
                </Link>
                <Link
                  href="/account/history"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <History className="h-4 w-4" />
                  {t('quizHistory')}
                </Link>
                <Link
                  href="/account/favorites"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  {t('favorites')}
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('settings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('language')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
                <Select
                  value={preferences.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Marketing Consent */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('marketingConsent')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized gift ideas and tips
                  </p>
                </div>
                <Switch
                  checked={preferences.marketingConsent}
                  onCheckedChange={handleMarketingToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/quiz">
                  <Button variant="gradient">Take New Quiz</Button>
                </Link>
                <Link href="/account/history">
                  <Button variant="outline">View Quiz History</Button>
                </Link>
                <Link href="/account/favorites">
                  <Button variant="outline">View Saved Gifts</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
