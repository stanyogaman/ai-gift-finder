import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@awseen/ui';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export const metadata = {
  title: 'Gift Selection Tips & Guides - AWSEEN Blog',
  description:
    'Expert advice on choosing perfect gifts, shopping tips, Amazon deal strategies, and the psychology of thoughtful gift-giving. Learn how AI makes gift shopping easier.'
};

// Mock data - replace with API call in production
const articles = [
  {
    id: '1',
    title: 'How to Choose the Perfect Gift: The Complete Guide',
    slug: 'how-to-choose-perfect-gift-guide',
    seoDescription:
      'Learn expert tips on choosing the perfect gift for any occasion. Discover how AI-powered gift finders save time and find personalized presents your loved ones will treasure.',
    tags: ['Gift Guide', 'How To', 'Gift Selection', 'Tips'],
    createdAt: new Date().toISOString(),
    author: { user: { name: 'AWSEEN Team' } }
  },
  {
    id: '2',
    title: '10 Reasons Why AI Gift Finders Beat Traditional Shopping',
    slug: 'why-ai-gift-finders-beat-traditional-shopping',
    seoDescription:
      'Discover why AI-powered gift recommendation tools outperform traditional shopping methods. Save time, money, and stress with smart, personalized gift suggestions.',
    tags: ['AI Technology', 'Gift Finding', 'Shopping Tips', 'Comparison'],
    createdAt: new Date().toISOString(),
    author: { user: { name: 'AWSEEN Team' } }
  },
  {
    id: '3',
    title: 'Amazon Gift Shopping Guide: Find the Best Deals in 2024',
    slug: 'amazon-gift-shopping-best-deals-guide',
    seoDescription:
      'Master Amazon gift shopping with our expert guide. Learn how to find the best deals, avoid overpaying, and get maximum value for your gift budget.',
    tags: ['Amazon', 'Deals', 'Shopping Guide', 'Money Saving'],
    createdAt: new Date().toISOString(),
    author: { user: { name: 'AWSEEN Team' } }
  },
  {
    id: '4',
    title: 'Gift Giving Psychology: Why Thoughtfulness Trumps Price',
    slug: 'gift-giving-psychology-thoughtfulness-vs-price',
    seoDescription:
      'Understand the psychology of gift-giving and why personalized, thoughtful presents create stronger emotional connections than expensive gifts.',
    tags: ['Psychology', 'Gift Giving', 'Relationships', 'Thoughtfulness'],
    createdAt: new Date().toISOString(),
    author: { user: { name: 'AWSEEN Team' } }
  },
  {
    id: '5',
    title: 'Last-Minute Gift Ideas: Quality Presents in a Time Crunch',
    slug: 'last-minute-gift-ideas-quality-fast',
    seoDescription:
      "Need a gift fast? Discover last-minute gift ideas that don't look rushed. Expert tips for finding quality presents with quick delivery, even when you're short on time.",
    tags: ['Last Minute', 'Fast Delivery', 'Gift Ideas', 'Time-Saving'],
    createdAt: new Date().toISOString(),
    author: { user: { name: 'AWSEEN Team' } }
  }
];

const popularTags = [
  'Gift Guide',
  'How To',
  'Amazon',
  'AI Technology',
  'Shopping Tips',
  'Deals',
  'Psychology',
  'Last Minute'
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Gift Selection Tips & Guides</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Expert advice, shopping strategies, and insights to help you choose the perfect gift every time.
          Learn how AI and smart shopping can transform your gift-giving experience.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        {/* Articles Grid */}
        <div className="space-y-6">
          {articles.map((article) => (
            <Card key={article.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${article.slug}`} className="hover:text-primary">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{article.seoDescription}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* CTA Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <CardHeader>
              <CardTitle>Find Your Perfect Gift</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Take our AI-powered quiz and get personalized gift recommendations in minutes.
              </p>
              <Link
                href="/quiz"
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full border px-3 py-1 text-sm transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why AI Quiz */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Our AI Quiz?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <div className="text-primary">✓</div>
                <div>
                  <strong>90%+ match accuracy</strong> - Our AI analyzes multiple factors for personalized
                  recommendations
                </div>
              </div>
              <div className="flex gap-2">
                <div className="text-primary">✓</div>
                <div>
                  <strong>Save 15+ hours</strong> - Skip endless browsing, get curated results in 5 minutes
                </div>
              </div>
              <div className="flex gap-2">
                <div className="text-primary">✓</div>
                <div>
                  <strong>Best Amazon deals</strong> - We scan millions of products for the best prices
                </div>
              </div>
              <div className="flex gap-2">
                <div className="text-primary">✓</div>
                <div>
                  <strong>Stress-free shopping</strong> - Make confident decisions backed by data
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
