import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
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
                <Link href="/client">
                  Explore the client panel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/automation">Automation playbooks</Link>
              </Button>
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
