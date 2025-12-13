import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { Heart, Sparkles, Leaf, Gift } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="container py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
          <Gift className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">{t('mission.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('mission.text')}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How We Help */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t('howWeHelp.title')}</h2>
        <p className="text-lg text-muted-foreground mb-6">
          {t('howWeHelp.text')}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold mb-2">Personalized Matching</h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes personality, interests, and relationships to find perfect matches.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2">Save Time</h3>
            <p className="text-sm text-muted-foreground">
              Get curated recommendations in minutes, not hours of browsing.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="font-semibold mb-2">Meaningful Gifts</h3>
            <p className="text-sm text-muted-foreground">
              Every suggestion is thoughtful, not random or generic.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('values.title')}</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex-shrink-0">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('values.thoughtfulness')}</h3>
                <p className="text-sm text-muted-foreground">
                  We believe the best gifts come from understanding the recipient, not just convenience or price.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex-shrink-0">
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('values.quality')}</h3>
                <p className="text-sm text-muted-foreground">
                  We recommend fewer, better options rather than overwhelming you with choices.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex-shrink-0">
                <Leaf className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t('values.sustainability')}</h3>
                <p className="text-sm text-muted-foreground">
                  We encourage thoughtful consumption and include experiences and digital gifts alongside physical products.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-muted-foreground mb-4">
          AI Gift Finder was born from a simple frustration: the stress of finding meaningful gifts for the people we care about.
          Too often, gift-giving becomes a last-minute scramble through endless product pages, hoping something will spark joy.
        </p>
        <p className="text-muted-foreground mb-4">
          We built this platform to change that. By combining the power of AI with thoughtful curation,
          we help you discover gifts that truly resonate with your recipients - whether it is a tech gadget for your partner,
          a cozy experience for your parent, or something unique for a friend who has everything.
        </p>
        <p className="text-muted-foreground">
          Our mission is simple: make gift-giving joyful again.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Ready to find the perfect gift?</h3>
        <p className="text-muted-foreground mb-6">
          Take our 2-minute quiz and let AI help you discover thoughtful gift ideas.
        </p>
        <Link href="/quiz">
          <Button variant="gradient" size="lg">
            Start the Gift Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'About Us',
  description: 'Learn about AI Gift Finder - our mission to make gift-giving joyful and meaningful.',
};
