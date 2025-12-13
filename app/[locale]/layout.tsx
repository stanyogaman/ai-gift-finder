import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/request';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/layout/AuthProvider';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as 'en' | 'ru')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return {
    title: {
      default: locale === 'en' ? 'AI Gift Finder - Find Thoughtful Gifts in Minutes' : 'AI Gift Finder - Найдите идеальный подарок за минуты',
      template: '%s | AI Gift Finder',
    },
    description:
      locale === 'en'
        ? 'Stop buying random stuff. Our AI helps you choose thoughtful, meaningful gifts that truly fit their personality and your relationship.'
        : 'Хватит покупать случайные вещи. Наш ИИ поможет выбрать продуманные, значимые подарки, которые действительно подходят.',
    keywords: ['gift finder', 'ai gifts', 'personalized gifts', 'gift ideas', 'thoughtful gifts'],
    authors: [{ name: 'AI Gift Finder' }],
    openGraph: {
      type: 'website',
      locale: locale,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: 'AI Gift Finder',
    },
  };
}
