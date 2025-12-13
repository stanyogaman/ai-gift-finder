import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create blog categories
  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'tech-gifts' },
      update: {},
      create: {
        slug: 'tech-gifts',
        name_en: 'Tech Gifts',
        name_ru: 'Технические подарки',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'experiences' },
      update: {},
      create: {
        slug: 'experiences',
        name_en: 'Experiences',
        name_ru: 'Впечатления',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'lifestyle' },
      update: {},
      create: {
        slug: 'lifestyle',
        name_en: 'Lifestyle',
        name_ru: 'Образ жизни',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'budget-friendly' },
      update: {},
      create: {
        slug: 'budget-friendly',
        name_en: 'Budget Friendly',
        name_ru: 'Бюджетные',
      },
    }),
  ]);

  console.log('Created categories:', categories.length);

  // Create sample blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'tech-gifts-for-partners' },
    update: {},
    create: {
      slug: 'tech-gifts-for-partners',
      published: true,
      featured: true,
      categoryId: categories[0].id,
      heroImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
      seoTitle_en: '21 Thoughtful Tech Gifts for Partners',
      seoDescription_en: 'Find the perfect tech gift for your partner with our curated list.',
      title_en: '21 Thoughtful Gifts for Tech-Loving Partners',
      title_ru: '21 продуманный подарок для партнеров-любителей техники',
      content_en: `# Finding the Perfect Tech Gift

Shopping for a tech enthusiast can be both exciting and challenging. Here are our top picks.

## Our Top Recommendations

### 1. Wireless Earbuds
Perfect for commuters and music lovers.

### 2. Smart Home Hub
Control your entire home with voice commands.

### 3. Portable Power Station
Never run out of battery on the go.

*Ready for more? [Take our quiz](/quiz) for personalized recommendations.*`,
      content_ru: `# Поиск идеального технического подарка

Выбор подарка для любителя техники может быть увлекательным и сложным одновременно.

## Наши рекомендации

### 1. Беспроводные наушники
Идеально для тех, кто много путешествует.

### 2. Умный домашний хаб
Управляйте всем домом голосом.`,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'minimalist-gifts' },
    update: {},
    create: {
      slug: 'minimalist-gifts',
      published: true,
      featured: true,
      categoryId: categories[2].id,
      heroImageUrl: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&h=400&fit=crop',
      seoTitle_en: '17 Minimalist Gifts That Dont Create Clutter',
      seoDescription_en: 'Gift ideas for people who have everything and want nothing.',
      title_en: '17 Minimalist Gifts That Dont Create Clutter',
      title_ru: '17 минималистичных подарков без лишнего',
      content_en: `# Gifts for the Person Who Has Everything

Some people are impossible to shop for. Here are thoughtful alternatives.

## Experience-Based Gifts

- Cooking classes
- Spa treatments
- Concert tickets

## Consumable Gifts

- Gourmet food baskets
- Premium skincare

## Digital Gifts

- Streaming subscriptions
- Online courses`,
      content_ru: `# Подарки для тех, у кого всё есть

Некоторых людей очень сложно удивить подарком. Вот продуманные альтернативы.

## Впечатления

- Кулинарные мастер-классы
- СПА процедуры

## Расходные подарки

- Гурманские корзины
- Премиум косметика`,
    },
  });

  console.log('Created blog posts');

  // Create sample gift templates
  const giftTemplates = [
    {
      title_en: 'Smart Reusable Notebook',
      title_ru: 'Умный многоразовый блокнот',
      description_en: 'Digitize notes instantly with this eco-friendly notebook that syncs to the cloud.',
      description_ru: 'Мгновенная оцифровка заметок с экологичным блокнотом, синхронизируемым с облаком.',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
      productUrl: 'https://amazon.com/s?k=smart+reusable+notebook',
      merchant: 'Amazon',
      minPrice: 25,
      maxPrice: 35,
      tags: ['tech', 'office', 'practical', 'eco'],
      occasionTags: ['birthday', 'graduation', 'holiday'],
      relationshipTags: ['colleague', 'friend', 'parent'],
      profitabilityScore: 0.7,
    },
    {
      title_en: 'Premium Coffee Subscription',
      title_ru: 'Премиум подписка на кофе',
      description_en: 'Monthly delivery of hand-picked specialty beans from around the world.',
      description_ru: 'Ежемесячная доставка отборных зерен от лучших обжарщиков со всего мира.',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      productUrl: 'https://amazon.com/s?k=coffee+subscription',
      merchant: 'Various',
      minPrice: 40,
      maxPrice: 60,
      tags: ['food', 'subscription', 'coffee', 'gourmet'],
      occasionTags: ['birthday', 'holiday', 'thankyou'],
      relationshipTags: ['parent', 'partner', 'friend'],
      profitabilityScore: 0.8,
    },
    {
      title_en: 'Weighted Blanket',
      title_ru: 'Утяжелённое одеяло',
      description_en: 'Premium weighted blanket for better sleep and relaxation.',
      description_ru: 'Премиальное утяжелённое одеяло для улучшения сна и расслабления.',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      productUrl: 'https://amazon.com/s?k=weighted+blanket',
      merchant: 'Amazon',
      minPrice: 70,
      maxPrice: 120,
      tags: ['wellness', 'home', 'cozy', 'self-care'],
      occasionTags: ['birthday', 'holiday', 'justbecause'],
      relationshipTags: ['partner', 'parent', 'close-friend'],
      profitabilityScore: 0.75,
    },
    {
      title_en: 'Portable Hammock',
      title_ru: 'Портативный гамак',
      description_en: 'Lightweight camping hammock for outdoor adventures.',
      description_ru: 'Легкий походный гамак для приключений на природе.',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
      productUrl: 'https://amazon.com/s?k=camping+hammock',
      merchant: 'Amazon',
      minPrice: 50,
      maxPrice: 80,
      tags: ['outdoor', 'travel', 'adventure', 'camping'],
      occasionTags: ['birthday', 'graduation'],
      relationshipTags: ['friend', 'partner', 'child'],
      profitabilityScore: 0.65,
    },
    {
      title_en: 'DIY Pottery Kit',
      title_ru: 'Набор для керамики своими руками',
      description_en: 'Complete pottery kit with clay, tools, and instructions for beginners.',
      description_ru: 'Полный набор для керамики с глиной, инструментами и инструкциями для начинающих.',
      imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
      productUrl: 'https://amazon.com/s?k=pottery+kit',
      merchant: 'Amazon',
      minPrice: 35,
      maxPrice: 55,
      tags: ['creative', 'diy', 'art', 'hobby'],
      occasionTags: ['birthday', 'holiday', 'justbecause'],
      relationshipTags: ['friend', 'partner', 'child'],
      profitabilityScore: 0.6,
    },
    {
      title_en: 'Noise-Cancelling Headphones',
      title_ru: 'Наушники с шумоподавлением',
      description_en: 'Premium wireless headphones with active noise cancellation.',
      description_ru: 'Премиальные беспроводные наушники с активным шумоподавлением.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      productUrl: 'https://amazon.com/s?k=noise+cancelling+headphones',
      merchant: 'Amazon',
      minPrice: 120,
      maxPrice: 250,
      tags: ['tech', 'audio', 'premium', 'music'],
      occasionTags: ['birthday', 'graduation', 'holiday'],
      relationshipTags: ['partner', 'child', 'friend'],
      profitabilityScore: 0.85,
    },
  ];

  for (const template of giftTemplates) {
    await prisma.giftTemplate.upsert({
      where: {
        id: template.title_en.toLowerCase().replace(/\s+/g, '-'),
      },
      update: template,
      create: {
        id: template.title_en.toLowerCase().replace(/\s+/g, '-'),
        ...template,
      },
    });
  }

  console.log('Created gift templates:', giftTemplates.length);

  // Create static pages
  const staticPages = [
    {
      slug: 'terms',
      title_en: 'Terms of Service',
      title_ru: 'Условия использования',
      content_en: 'Terms of Service content here...',
      content_ru: 'Условия использования...',
    },
    {
      slug: 'privacy',
      title_en: 'Privacy Policy',
      title_ru: 'Политика конфиденциальности',
      content_en: 'Privacy Policy content here...',
      content_ru: 'Политика конфиденциальности...',
    },
    {
      slug: 'cookies',
      title_en: 'Cookie Policy',
      title_ru: 'Политика использования cookies',
      content_en: 'Cookie Policy content here...',
      content_ru: 'Политика использования cookies...',
    },
    {
      slug: 'affiliate-disclosure',
      title_en: 'Affiliate Disclosure',
      title_ru: 'Партнерское раскрытие',
      content_en: 'Affiliate Disclosure content here...',
      content_ru: 'Партнерское раскрытие...',
    },
  ];

  for (const page of staticPages) {
    await prisma.staticPage.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }

  console.log('Created static pages:', staticPages.length);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
