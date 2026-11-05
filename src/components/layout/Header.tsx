'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, User, Lightbulb, FolderKanban, Mail, Sun, Moon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'about', label: 'About', icon: User, href: '/about' },
  { id: 'skills', label: 'Skills', icon: Lightbulb, href: '/skills' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, href: '/projects' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '/contact' },
];

const subscribeTheme = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getThemeSnapshot = (): 'light' | 'dark' => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const getThemeServerSnapshot = (): 'light' | 'dark' => {
  return 'light';
};

const subscribeMounted = () => () => {};
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getMountedServerSnapshot);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  // Eagerly prefetch all routes in background when browser is idle
  useEffect(() => {
    const prefetchRoutes = () => {
      navItems.forEach((item) => {
        if (item.href !== pathname) {
          router.prefetch(item.href);
        }
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        prefetchRoutes,
        { timeout: 1200 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(prefetchRoutes, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, router]);

  // Do not render portfolio header on admin page
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const nextTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      {/* 1. DESKTOP HEADER (Visible only on lg screens) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-10 py-6 hidden lg:flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Center: Nav Pill */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center bg-card/80 backdrop-blur-2xl border border-border/40 p-1.5 rounded-full shadow-xl"
          >
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  prefetch={true}
                  onMouseEnter={() => router.prefetch(item.href)}
                  onTouchStart={() => router.prefetch(item.href)}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    active
                      ? 'bg-foreground text-background font-semibold shadow-md scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Switcher Button (Desktop) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-3 rounded-full bg-card/80 backdrop-blur-2xl border border-border/40 text-foreground hover:bg-foreground/10 transition-all duration-300 shadow-xl flex items-center justify-center cursor-pointer"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>
      </header>

      {/* 2. MOBILE & TABLET BOTTOM NAV (Hidden on lg screens) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed z-40 left-1/2 -translate-x-1/2 w-[92%] max-w-md lg:hidden bottom-6"
      >
        <div className="bg-card/90 backdrop-blur-3xl border border-border/40 p-1.5 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch={true}
                onMouseEnter={() => router.prefetch(item.href)}
                onTouchStart={() => router.prefetch(item.href)}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex flex-col items-center justify-center py-2.5 px-3 rounded-full transition-all duration-300 min-w-[50px]',
                  active ? 'text-foreground font-bold' : 'text-muted-foreground'
                )}
              >
                <Icon className={cn('w-5 h-5 transition-all', active && 'scale-110 stroke-[2.5px]')} />
                <span
                  className={cn(
                    'text-[9px] font-bold uppercase mt-1 hidden sm:block',
                    active ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {item.label}
                </span>
                {active && <div className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
              </Link>
            );
          })}

          {/* Theme Switcher Button (Mobile) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full text-foreground hover:bg-foreground/10 transition-all flex items-center justify-center cursor-pointer"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
