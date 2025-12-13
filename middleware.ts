import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/request';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (static files)
    // - /_vercel (Vercel internals)
    // - All files with an extension (e.g. favicon.ico)
    '/((?!api|_next|static|_vercel|.*\\..*).*)',
  ],
};
