import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AWSEEN — AI Shopping Intelligence',
  description: 'Personalised recommendations, partner analytics, and automation for product discovery.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="flex-1 py-8">{children}</main>
          <footer className="border-t bg-muted/40 py-6">
            <div className="container flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} AWSEEN.com. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="/privacy" className="hover:text-foreground">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-foreground">
                  Terms
                </a>
                <a href="mailto:hello@awseen.com" className="hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
