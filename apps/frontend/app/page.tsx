import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, Target, TrendingUp, Star, Award, Users } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@awseen/ui';
import { ProductCard } from '@/components/product-card';
import { mockProducts } from '@/lib/sample-data';

const features = [
  {
    title: 'Client Panel',
    description: 'Quiz-driven onboarding, personalised gift feeds and AI-generated product explainers.',
    href: '/client'
  },
  {
    title: 'Admin Control',
    description: 'Manage catalogue overrides, run enrichment pipelines and monitor affiliate performance.',
    href: '/admin'
  },
  {
    title: 'Partner Analytics',
    description: 'Upload product feeds, inspect click → conversion funnels and automate payout reporting.',
    href: '/partner'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="border-y bg-gradient-to-b from-background via-background to-muted/30 py-16">
        <div className="container grid gap-12 md:grid-cols-[1.25fr,1fr] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI Commerce Operating System
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Convert discovery into revenue with one AI-native platform
            </h1>
            <p className="text-lg text-muted-foreground">
              AWSEEN orchestrates Gemini, OpenAI and Google Shopping intelligence to surface shoppable, high-intent
              experiences for every customer journey.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/quiz">
                  Find Your Perfect Gift
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">Gift Selection Tips</Link>
              </Button>
            </div>
            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>90%+ Match Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>5-Minute Quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Best Amazon Deals</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {mockProducts.slice(0, 2).map((item) => (
              <ProductCard key={item.product.id} product={item.product} score={item.score} />
            ))}
          </div>
        </div>
      </section>
      <section className="container space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col justify-between gap-4 text-sm text-muted-foreground">
                <p>{feature.description}</p>
                <Button variant="secondary" className="self-start" asChild>
                  <Link href={feature.href}>
                    View panel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator />
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendation Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                We capture quiz responses, session telemetry and purchase signals to form preference embeddings. Products are
                enriched with Gemini structured data extraction, OpenAI summarisation and revenue forecasts. A scoring
                matrix combines semantic similarity, budget fit, ratings, discounts and shipping alignment.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <FeaturePill title="Gemini 1.5 Pro" description="Vision-led enrichment with attribute extraction." />
                <FeaturePill title="GPT-4o" description="Narrative copy, badge generation and SEO surfaces." />
                <FeaturePill title="Programmable Search" description="Affiliate-aware catalogue expansion." />
                <FeaturePill title="Edge delivery" description="Next.js streaming with React Server Components." />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Automation-ready</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Pipe structured events straight into n8n or Make.com webhooks. Trigger partner nudges, sync CRM audiences,
                launch seasonal drops and generate affiliate landing pages automatically.
              </p>
              <ul className="grid gap-2 text-sm">
                <li>• Webhook signing & retry semantics</li>
                <li>• Cron-based product refresh controls</li>
                <li>• Admin dashboards for pipeline observability</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-2 text-3xl font-bold text-primary">90%+</div>
              <div className="text-sm text-muted-foreground">Match Accuracy</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-2 text-3xl font-bold text-primary">15+ hrs</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-2 text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Products Scanned</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-2 text-3xl font-bold text-primary">5 min</div>
              <div className="text-sm text-muted-foreground">Quiz Duration</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container space-y-8">
        <div className="text-center">
          <h2 className="mb-3 text-3xl font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Join thousands who've discovered the joy of stress-free gift giving
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm">
                "I was dreading Christmas shopping this year, but this AI quiz made it SO easy. Found perfect
                gifts for everyone in 20 minutes. My sister loved her eco-friendly smart mug!"
              </p>
              <div className="text-sm font-medium">Sarah M.</div>
              <div className="text-xs text-muted-foreground">Holiday Shopper</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm">
                "The AI recommendations were spot-on! It suggested things I never would have thought of, but
                they were absolutely perfect for my husband's interests. Saved me hours of browsing."
              </p>
              <div className="text-sm font-medium">Michael T.</div>
              <div className="text-xs text-muted-foreground">Anniversary Gift</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm">
                "As someone who struggles with gift-giving, this platform is a game-changer. The quiz asks all
                the right questions, and the AI finds options I'm actually confident about."
              </p>
              <div className="text-sm font-medium">Jennifer L.</div>
              <div className="text-xs text-muted-foreground">Birthday Present</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold">Why Choose Our AI Gift Finder?</h2>
            <p className="text-muted-foreground">
              The smartest way to find gifts that create lasting memories
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Personalized Matching</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes 15+ factors including personality, interests, lifestyle, and occasion to find
                gifts with the highest compatibility score.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Best Amazon Deals</h3>
              <p className="text-sm text-muted-foreground">
                We scan millions of products in real-time to find the best prices, deals, and reviews within
                your budget range.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Save Hours of Time</h3>
              <p className="text-sm text-muted-foreground">
                Stop endless scrolling. Our 5-minute quiz replaces 15+ hours of research with data-backed
                recommendations you can trust.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/quiz">
                Start Finding Perfect Gifts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="container space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Gift Selection Tips & Guides</h2>
            <p className="text-muted-foreground">Expert advice to help you choose the perfect gift</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Choose the Perfect Gift</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Learn expert strategies for selecting gifts that truly resonate with your loved ones.
              </p>
              <Link href="/blog/how-to-choose-perfect-gift-guide" className="text-sm font-medium text-primary hover:underline">
                Read more →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why AI Gift Finders Win</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Discover 10 reasons why AI-powered recommendations beat traditional shopping.
              </p>
              <Link href="/blog/why-ai-gift-finders-beat-traditional-shopping" className="text-sm font-medium text-primary hover:underline">
                Read more →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Amazon Shopping Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Master Amazon gift shopping with our comprehensive deals and money-saving tips.
              </p>
              <Link href="/blog/amazon-gift-shopping-best-deals-guide" className="text-sm font-medium text-primary hover:underline">
                Read more →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-12 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Ready to Transform Your Gift Shopping?</span>
              </div>
              <h2 className="text-3xl font-bold">Find the Perfect Gift in 5 Minutes</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of happy gift-givers who've discovered the joy of AI-powered personalization.
                No more guessing, no more endless browsing—just perfect gifts, every time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/quiz">
                    Take the Quiz Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog">Learn More</Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-primary" />
                  90%+ Match Rate
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  Trusted by Thousands
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  Highly Rated
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function FeaturePill({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-background/60 p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
