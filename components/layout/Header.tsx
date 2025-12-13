'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { onAuthChange, signOut, User } from '@/lib/firebase/client';
import {
  Menu,
  X,
  Gift,
  User as UserIcon,
  LogOut,
  Settings,
  Heart,
  History,
  Shield,
  Globe,
} from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'ru' });
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/blog', label: t('blog') },
    { href: '/partnerships', label: t('partnerships') },
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Gift className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Gift Finder
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}
            className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Start Quiz Button (Desktop) */}
          <Link href="/quiz" className="hidden md:block">
            <Button variant="gradient" size="sm">
              {t('home') === 'Home' ? 'Start Quiz' : 'Пройти тест'}
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-muted transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-background shadow-lg z-50">
                    <div className="p-3 border-b">
                      <p className="font-medium truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        {t('account')}
                      </Link>
                      <Link
                        href="/account/favorites"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        Favorites
                      </Link>
                      <Link
                        href="/account/history"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        <History className="h-4 w-4" />
                        History
                      </Link>
                      {/* Admin link - would check role in real app */}
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        <Shield className="h-4 w-4" />
                        {t('admin')}
                      </Link>
                    </div>
                    <div className="border-t p-2">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        {t('signOut')}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="hidden sm:block">
              <Button variant="outline" size="sm">
                {t('signIn')}
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t mt-2 flex items-center justify-between">
              <button
                onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground"
              >
                <Globe className="h-4 w-4" />
                {locale === 'en' ? 'Русский' : 'English'}
              </button>
              {!user && (
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm">{t('signIn')}</Button>
                </Link>
              )}
            </div>
            <Link
              href="/quiz"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2"
            >
              <Button variant="gradient" className="w-full">
                Start Gift Quiz
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
