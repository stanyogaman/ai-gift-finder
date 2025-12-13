import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { prisma } from '@/lib/prisma';
import { Link } from '@/lib/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getLocalizedField } from '@/lib/utils';
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

async function getBlogPost(slug: string, locale: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    include: { category: true },
  });

  if (!post) return null;

  return {
    id: post.id,
    slug: post.slug,
    title: getLocalizedField(post, 'title', locale),
    content: getLocalizedField(post, 'content', locale),
    seoTitle: getLocalizedField(post, 'seoTitle', locale),
    seoDescription: getLocalizedField(post, 'seoDescription', locale),
    heroImageUrl: post.heroImageUrl,
    createdAt: post.createdAt,
    category: post.category
      ? {
          slug: post.category.slug,
          name: getLocalizedField(post.category, 'name', locale),
        }
      : null,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = useTranslations('blog');

  let post;
  try {
    post = await getBlogPost(slug, locale);
  } catch {
    // Use demo post for demo purposes
    post = getDemoPost(slug, locale);
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-8 max-w-4xl">
      {/* Back button */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Hero Image */}
      {post.heroImageUrl && (
        <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-8">
          <Image
            src={post.heroImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {post.category && (
          <Link href={`/categories/${post.category.slug}`}>
            <Badge variant="secondary">{post.category.name}</Badge>
          </Link>
        )}
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(post.createdAt).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

      {/* Affiliate Disclosure */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-amber-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          {t('affiliateDisclosure')}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-purple-600 prose-img:rounded-lg">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to find your perfect gift?</h3>
        <p className="text-muted-foreground mb-6">
          Take our AI-powered quiz for personalized recommendations.
        </p>
        <Link href="/quiz">
          <Button variant="gradient" size="lg">
            Start the Gift Quiz
          </Button>
        </Link>
      </div>
    </article>
  );
}

function getDemoPost(slug: string, locale: string) {
  const posts: Record<string, unknown> = {
    'thoughtful-tech-gifts-for-partners': {
      id: '1',
      slug: 'thoughtful-tech-gifts-for-partners',
      title: '21 Thoughtful Gifts for Tech-Loving Partners',
      seoDescription: 'Find the perfect tech gift for your partner.',
      heroImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
      createdAt: new Date('2024-12-01'),
      category: { slug: 'tech', name: 'Tech Gifts' },
      content: `
# Finding the Perfect Tech Gift

Shopping for a tech enthusiast can be both exciting and challenging. You want to find something they'll love and actually use.

## Our Top Picks

### 1. Wireless Earbuds with ANC
Perfect for commuters and music lovers. Premium sound quality meets convenience.
- **Price:** $79 - $249
- **Best for:** Daily commuters, music enthusiasts

### 2. Smart Home Hub
Control lights, thermostats, and more with voice commands.
- **Price:** $99 - $199
- **Best for:** Smart home beginners

### 3. Portable Power Station
Never run out of battery on adventures.
- **Price:** $49 - $149
- **Best for:** Travelers, outdoor enthusiasts

## Pro Tips for Tech Gifts

1. **Check compatibility** - Make sure it works with their existing devices
2. **Read recent reviews** - Tech changes fast
3. **Consider subscriptions** - Sometimes access beats ownership

---

*Ready to find more personalized recommendations? [Take our quiz](/quiz) for AI-powered gift suggestions tailored to your recipient.*
      `,
    },
    'minimalist-gifts-no-clutter': {
      id: '2',
      slug: 'minimalist-gifts-no-clutter',
      title: '17 Minimalist Gifts That Dont Create Clutter',
      seoDescription: 'Gift ideas for people who have everything.',
      heroImageUrl: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&h=400&fit=crop',
      createdAt: new Date('2024-11-28'),
      category: { slug: 'lifestyle', name: 'Lifestyle' },
      content: `
# Gifts for the Person Who Has Everything

Some people seem impossible to shop for. They have everything they need and prefer experiences over possessions.

## Experience-Based Gifts

### Cooking Classes
A fun way to learn new skills and create memories.

### Spa Day
Everyone deserves relaxation.

### Concert or Event Tickets
Create unforgettable memories together.

## Consumable Gifts

### Gourmet Food Baskets
Artisan chocolates, specialty coffees, or local treats.

### Premium Skincare
Luxurious products they might not buy themselves.

## Digital Gifts

### Streaming Subscriptions
Music, movies, or audiobooks.

### Online Course Access
Help them learn something new.
      `,
    },
  };

  return posts[slug] || null;
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;

  let post;
  try {
    post = await getBlogPost(slug, locale);
  } catch {
    post = getDemoPost(slug, locale);
  }

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription,
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      images: post.heroImageUrl ? [post.heroImageUrl] : [],
    },
  };
}
