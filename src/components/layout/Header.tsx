'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Lightbulb, FolderKanban, Mail, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { usePortfolio3D } from '@/shared/context/Portfolio3DContext';

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
  const { activeIndex, isDeckRoute, isUiHidden, toggleUiHidden, navigateTo } = usePortfolio3D();
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getMountedServerSnapshot);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  // Do not render portfolio header on admin page
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isItemActive = (href: string, index: number) => {
    if (isDeckRoute) {
      return activeIndex === index;
    }
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigateTo(href);
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const nextTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      {/* 1. TOP-RIGHT CONTROLS: ZEN EYE TOGGLE + THEME SWITCHER */}
      <div
        className={cn(
          'fixed top-4 right-4 sm:top-6 sm:right-8 z-50 flex items-center gap-2.5 transition-opacity duration-300',
          isUiHidden ? 'opacity-45 hover:opacity-100' : 'opacity-100'
        )}
      >
        {/* Hide / Show All Content Button */}
        <button
          type="button"
          onClick={toggleUiHidden}
          aria-label={isUiHidden ? 'Show page content' : 'Hide page content'}
          aria-pressed={isUiHidden}
          title={isUiHidden ? 'Show interface' : 'Hide interface'}
          className="p-3.5 rounded-full bg-card/80 backdrop-blur-2xl border border-border/40 text-foreground hover:bg-foreground/10 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center cursor-pointer"
        >
          {isUiHidden ? (
            <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/85 transition-transform duration-300" />
          ) : (
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/85 transition-transform duration-300" />
          )}
        </button>

        {/* Light / Dark Mode Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title="Toggle Theme"
          className="p-3.5 rounded-full bg-card/80 backdrop-blur-2xl border border-border/40 text-foreground hover:bg-foreground/10 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center cursor-pointer"
        >
          {mounted && theme === 'dark' ? (
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>
      </div>

      {/* 2. MOBILE & TABLET BOTTOM NAV (Hidden on lg screens) */}
      <nav
        aria-label="Mobile Navigation"
        className={cn(
          'fixed z-40 left-1/2 -translate-x-1/2 w-[92%] max-w-md lg:hidden bottom-6 transition-all duration-500',
          isUiHidden ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        )}
      >
        <div className="bg-card/90 backdrop-blur-3xl border border-border/40 p-1.5 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-around">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isItemActive(item.href, index);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
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
        </div>
      </nav>
    </>
  );
}
