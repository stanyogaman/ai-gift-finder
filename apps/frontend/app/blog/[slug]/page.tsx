import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@awseen/ui';
import { ArrowLeft, ArrowRight, Calendar, Tag, Share2 } from 'lucide-react';

// This would normally fetch from API
const getArticle = async (slug: string) => {
  // Mock data - replace with actual API call
  const articles: Record<string, any> = {
    'how-to-choose-perfect-gift-guide': {
      title: 'How to Choose the Perfect Gift: The Complete Guide',
      slug: 'how-to-choose-perfect-gift-guide',
      seoDescription:
        'Learn expert tips on choosing the perfect gift for any occasion. Discover how AI-powered gift finders save time and find personalized presents your loved ones will treasure.',
      tags: ['Gift Guide', 'How To', 'Gift Selection', 'Tips'],
      createdAt: new Date().toISOString(),
      author: { user: { name: 'AWSEEN Team' } },
      content: `Finding the perfect gift can be challenging, but with the right approach, you can select presents that truly resonate with your loved ones.`
    }
  };

  return articles[slug] || null;
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="container py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Article Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {/* Back Link */}
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all articles
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        {/* Article Content */}
        <article className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span>By {article.author.user.name}</span>
            </div>
          </div>

          <Separator />

          {/* Article Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">{article.content}</div>
          </div>

          <Separator className="my-8" />

          {/* Call to Action */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <CardHeader>
              <CardTitle>Ready to Find the Perfect Gift?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Put these tips into action! Take our AI-powered quiz and get personalized gift recommendations
                tailored to your recipient in just 5 minutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Start Gift Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/client"
                  className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 font-medium text-primary hover:bg-primary/5"
                >
                  View Dashboard
                </Link>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>AI-powered personalization based on 15+ factors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Access to best Amazon deals and prices in your budget</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>90%+ match accuracy - gifts they'll actually love</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Save 15+ hours of browsing and research</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Share */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Share2 className="h-4 w-4" />
                Share Article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full rounded-lg border px-4 py-2 text-left text-sm transition-colors hover:bg-muted">
                Share on Twitter
              </button>
              <button className="w-full rounded-lg border px-4 py-2 text-left text-sm transition-colors hover:bg-muted">
                Share on Facebook
              </button>
              <button className="w-full rounded-lg border px-4 py-2 text-left text-sm transition-colors hover:bg-muted">
                Copy Link
              </button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Choose Our AI Gift Finder?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">90%+</div>
                <div className="text-sm text-muted-foreground">Match Accuracy</div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5 min</div>
                <div className="text-sm text-muted-foreground">Quiz Duration</div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+ hrs</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Products Scanned</div>
              </div>
            </CardContent>
          </Card>

          {/* Related Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Articles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/blog/why-ai-gift-finders-beat-traditional-shopping"
                className="block text-sm hover:text-primary"
              >
                → Why AI Gift Finders Beat Traditional Shopping
              </Link>
              <Link
                href="/blog/amazon-gift-shopping-best-deals-guide"
                className="block text-sm hover:text-primary"
              >
                → Amazon Gift Shopping Guide
              </Link>
              <Link
                href="/blog/last-minute-gift-ideas-quality-fast"
                className="block text-sm hover:text-primary"
              >
                → Last-Minute Gift Ideas
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
