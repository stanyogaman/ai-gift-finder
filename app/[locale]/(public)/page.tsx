import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Sparkles, Clock, Heart, Search } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const common = useTranslations('common');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              <Sparkles className="h-4 w-4" />
              AI-Powered Gift Discovery
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {t('hero.title')}{' '}
              <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/quiz">
                <Button variant="gradient" size="xl" className="gap-2">
                  <Gift className="h-5 w-5" />
                  {t('hero.startQuiz')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {t('howItWorks.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-white shadow-lg">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-100 opacity-50" />
              <CardContent className="relative p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t('howItWorks.step1.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.step1.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 to-white shadow-lg">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-pink-100 opacity-50" />
              <CardContent className="relative p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t('howItWorks.step2.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.step2.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-teal-50 to-white shadow-lg">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-teal-100 opacity-50" />
              <CardContent className="relative p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {t('howItWorks.step3.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.step3.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {t('benefits.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Heart className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('benefits.thoughtful.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('benefits.thoughtful.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                <Clock className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('benefits.saveTime.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('benefits.saveTime.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                <Sparkles className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('benefits.antiClutter.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('benefits.antiClutter.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to find the perfect gift?
          </h2>
          <p className="mb-8 text-lg text-white/80 max-w-2xl mx-auto">
            Take our 2-minute quiz and let AI help you discover thoughtful gift ideas tailored to your recipient.
          </p>
          <Link href="/quiz">
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-white/90"
            >
              <Gift className="mr-2 h-5 w-5" />
              Start the Gift Quiz
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
