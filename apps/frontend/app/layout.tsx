import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atelier Samui — Premium Palm Wood Furniture & Interior Design',
  description: 'Exquisite custom-built furniture from sustainable palm wood. Room dividers, storage systems, wall decor, and bespoke interior solutions for tropical villas, hotels, and restaurants in Thailand.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-muted/60 py-12">
            <div className="container">
              <div className="grid gap-8 md:grid-cols-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">ATELIER SAMUI</h3>
                  <p className="text-sm text-muted-foreground">
                    Crafting premium furniture from sustainable palm wood for tropical living spaces.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Products</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/products/room-dividers" className="hover:text-foreground transition-colors">Room Dividers</a></li>
                    <li><a href="/products/storage-systems" className="hover:text-foreground transition-colors">Storage Systems</a></li>
                    <li><a href="/products/wall-decor" className="hover:text-foreground transition-colors">Wall Decor</a></li>
                    <li><a href="/products/furniture" className="hover:text-foreground transition-colors">Custom Furniture</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
                    <li><a href="/projects" className="hover:text-foreground transition-colors">Projects</a></li>
                    <li><a href="/calculator" className="hover:text-foreground transition-colors">Price Calculator</a></li>
                    <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Connect</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="https://instagram.com/atelier.samui" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>
                    <li><a href="https://facebook.com/ateliersamui" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Facebook</a></li>
                    <li><a href="tel:+66123456789" className="hover:text-foreground transition-colors">+66 (0)12 345 6789</a></li>
                    <li><a href="mailto:info@atelier-samui.com" className="hover:text-foreground transition-colors">info@atelier-samui.com</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 border-t pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
                <span>© {new Date().getFullYear()} Atelier Samui. All rights reserved.</span>
                <div className="flex items-center gap-4">
                  <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
                  <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
