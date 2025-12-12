import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Flame, Gift, Star } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ScrollArea, Separator } from '@awseen/ui';
import { ProductCard } from '@/components/product-card';
import { mockProducts } from '@/lib/sample-data';

export const metadata: Metadata = {
  title: 'AWSEEN Client Panel',
  description: 'Quiz onboarding, personalised recommendations and wishlist management for shoppers.'
};

const quizSummary = {
  preferences: ['Eco-friendly', 'Smart home', 'Minimalist'],
  event: 'Birthday',
  budget: '$100 – $500'
};

const insights = [
  { icon: Gift, label: 'Quizzes completed', value: '12,438', trend: '+18% MoM' },
  { icon: Flame, label: 'Average match score', value: '87%', trend: '+6 pts' },
  { icon: Star, label: 'Saved to wishlist', value: '5,213', trend: '+11% MoM' }
];

export default function ClientDashboardPage() {
  return (
    <div className="container space-y-12">
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Client intelligence cockpit</h1>
            <p className="text-muted-foreground">
              Guide shoppers from intent to conversion with AI-personalised product matches, wishlist alerts and affiliate
              ready call-to-actions.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/quiz">Launch quiz flow</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Latest quiz snapshot</CardTitle>
              <CardDescription>Inputs are converted into embeddings with Gemini 1.5 Pro.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Preferences</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quizSummary.preferences.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Event</span>
                <span>{quizSummary.event}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Budget</span>
                <span>{quizSummary.budget}</span>
              </div>
            </CardContent>
          </Card>
          {insights.map((insight) => (
            <Card key={insight.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{insight.label}</CardTitle>
                <insight.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insight.value}</div>
                <p className="text-xs text-muted-foreground">{insight.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.65fr,1fr]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Recommended products</CardTitle>
            <CardDescription>Composite score derived from similarity + commercial metrics.</CardDescription>
          </CardHeader>
          <ScrollArea className="h-[540px]">
            <div className="space-y-4 p-6 pt-0">
              {mockProducts.map((item) => (
                <ProductCard key={item.product.id} product={item.product} score={item.score} />
              ))}
            </div>
          </ScrollArea>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement funnel</CardTitle>
            <CardDescription>Track interactions through to affiliate conversion events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <FunnelRow label="Quiz completions" value="12,438" />
            <FunnelRow label="Recommendations generated" value="51,902" />
            <FunnelRow label="Affiliate clicks" value="8,304" />
            <FunnelRow label="Tracked conversions" value="1,294" accent />
            <Separator />
            <div className="space-y-3">
              <p className="font-medium text-foreground">Actions</p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/api/automation/webhooks/client-nurture" target="_blank">
                  Trigger nurture workflow
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/reports/client-insights">Download CSV</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function FunnelRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${accent ? 'text-primary' : ''}`}>{value}</span>
    </div>
  );
}
