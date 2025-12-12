import Link from 'next/link';
import { Button, NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@awseen/ui';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/client', label: 'Client Panel' },
  { href: '/admin', label: 'Admin Panel' },
  { href: '/partner', label: 'Partner Panel' },
  { href: '/automation', label: 'Automation' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="rounded-md bg-primary px-2 py-1 text-sm text-primary-foreground">AW</span>
          <span>AWSEEN</span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="secondary" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
