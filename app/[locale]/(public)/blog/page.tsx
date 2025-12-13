import { useTranslations, useLocale } from 'next-intl';
import { prisma } from '@/lib/prisma';
import { Link } from '@/lib/i18n/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLocalizedField } from '@/lib/utils';
import Image from 'next/image';

async function getBlogPosts(locale: string) {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: getLocalizedField(post, 'title', locale),
    seoDescription: getLocalizedField(post, 'seoDescription', locale),
    heroImageUrl: post.heroImageUrl,
    featured: post.featured,
    createdAt: post.createdAt,
    category: post.category
      ? {
          slug: post.category.slug,
          name: getLocalizedField(post.category, 'name', locale),
        }
      : null,
  }));
}

async function getCategories(locale: string) {
  const categories = await prisma.blogCategory.findMany();
  return categories.map((cat) => ({
    slug: cat.slug,
    name: getLocalizedField(cat, 'name', locale),
  }));
}

export default async function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();

  let posts = [];
  let categories = [];

  try {
    [posts, categories] = await Promise.all([
      getBlogPosts(locale),
      getCategories(locale),
    ]);
  } catch (error) {
    // Use demo data if database not available
    posts = getDemoPosts();
    categories = getDemoCategories();
  }

  const featuredPosts = posts.filter((p) => p.featured);
  const recentPosts = posts.filter((p) => !p.featured);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link href="/blog">
            <Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {t('allPosts')}
            </Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('featured')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video relative bg-muted">
                    {post.heroImageUrl ? (
                      <Image
                        src={post.heroImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                        <span className="text-6xl">🎁</span>
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      {t('featured')}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    {post.category && (
                      <Badge variant="outline" className="mb-2">
                        {post.category.name}
                      </Badge>
                    )}
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.seoDescription}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {new Date(post.createdAt).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t('recentPosts')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(recentPosts.length > 0 ? recentPosts : posts).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative bg-muted">
                  {post.heroImageUrl ? (
                    <Image
                      src={post.heroImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                      <span className="text-4xl">🎁</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  {post.category && (
                    <Badge variant="outline" className="mb-2 text-xs">
                      {post.category.name}
                    </Badge>
                  )}
                  <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.seoDescription}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function getDemoPosts() {
  return [
    {
      id: '1',
      slug: 'thoughtful-tech-gifts-for-partners',
      title: '21 Thoughtful Gifts for Tech-Loving Partners',
      seoDescription: 'Find the perfect tech gift for your partner with our curated list of gadgets, subscriptions, and experiences.',
      heroImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
      featured: true,
      createdAt: new Date('2024-12-01'),
      category: { slug: 'tech', name: 'Tech Gifts' },
    },
    {
      id: '2',
      slug: 'minimalist-gifts-no-clutter',
      title: '17 Minimalist Gifts That Dont Create Clutter',
      seoDescription: 'Gift ideas for the person who has everything and wants nothing. Experiences, consumables, and thoughtful alternatives.',
      heroImageUrl: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&h=400&fit=crop',
      featured: true,
      createdAt: new Date('2024-11-28'),
      category: { slug: 'lifestyle', name: 'Lifestyle' },
    },
    {
      id: '3',
      slug: 'experience-gifts-for-couples',
      title: '25 Experience Gifts for Couples Who Dont Need Stuff',
      seoDescription: 'Create memories, not clutter. Unique experience gift ideas for couples of all ages.',
      heroImageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=400&fit=crop',
      featured: false,
      createdAt: new Date('2024-11-25'),
      category: { slug: 'experiences', name: 'Experiences' },
    },
  ];
}

function getDemoCategories() {
  return [
    { slug: 'tech', name: 'Tech Gifts' },
    { slug: 'experiences', name: 'Experiences' },
    { slug: 'lifestyle', name: 'Lifestyle' },
    { slug: 'budget', name: 'Budget Friendly' },
  ];
}
