'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const PORTFOLIO_TABS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'skills', label: 'Skills', href: '/skills' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'contact', label: 'Contact', href: '/contact' },
] as const;

export type PortfolioTab = (typeof PORTFOLIO_TABS)[number];

function resolveTabIndex(pathname: string | null): number {
  if (!pathname || pathname === '/') return 0;
  const idx = PORTFOLIO_TABS.findIndex(
    (tab) => tab.href !== '/' && (pathname === tab.href || pathname.startsWith(tab.href + '/'))
  );
  return idx >= 0 ? idx : -1;
}

interface Portfolio3DContextValue {
  tabs: readonly PortfolioTab[];
  activeIndex: number;
  direction: 1 | -1;
  isTransitioning: boolean;
  isDeckRoute: boolean;
  navigateTo: (hrefOrIndex: string | number) => void;
  nextTab: () => void;
  prevTab: () => void;
}

const Portfolio3DContext = createContext<Portfolio3DContextValue | null>(null);

const TRANSITION_DURATION_MS = 720;

export function Portfolio3DProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const routeIndex = resolveTabIndex(pathname);
  const isDeckRoute = routeIndex >= 0;

  const [activeIndex, setActiveIndex] = useState<number>(() => (routeIndex >= 0 ? routeIndex : 0));
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Keep synced when Next.js pathname changes externally (e.g., navigation from /admin)
  useEffect(() => {
    if (routeIndex >= 0 && routeIndex !== activeIndexRef.current) {
      setDirection(routeIndex > activeIndexRef.current ? 1 : -1);
      setActiveIndex(routeIndex);
    }
  }, [routeIndex]);

  const triggerTransitionState = useCallback(() => {
    setIsTransitioning(true);
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);
  }, []);

  // Listen to browser back / forward buttons while inside deck mode
  useEffect(() => {
    if (!isDeckRoute) return;

    const handlePopState = () => {
      const nextIdx = resolveTabIndex(window.location.pathname);
      if (nextIdx >= 0 && nextIdx !== activeIndexRef.current) {
        setDirection(nextIdx > activeIndexRef.current ? 1 : -1);
        setActiveIndex(nextIdx);
        triggerTransitionState();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isDeckRoute, triggerTransitionState]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const navigateTo = useCallback(
    (hrefOrIndex: string | number) => {
      const targetIndex =
        typeof hrefOrIndex === 'number'
          ? hrefOrIndex
          : PORTFOLIO_TABS.findIndex((t) => t.href === hrefOrIndex || t.id === hrefOrIndex);

      if (targetIndex < 0 || targetIndex >= PORTFOLIO_TABS.length) {
        if (typeof hrefOrIndex === 'string') {
          router.push(hrefOrIndex);
        }
        return;
      }

      if (!isDeckRoute) {
        router.push(PORTFOLIO_TABS[targetIndex].href);
        return;
      }

      const currentIdx = activeIndexRef.current;
      if (targetIndex === currentIdx) return;

      setDirection(targetIndex > currentIdx ? 1 : -1);
      setActiveIndex(targetIndex);
      triggerTransitionState();

      const targetHref = PORTFOLIO_TABS[targetIndex].href;
      if (typeof window !== 'undefined' && window.location.pathname !== targetHref) {
        window.history.pushState(null, '', targetHref);
      }
    },
    [isDeckRoute, router, triggerTransitionState]
  );

  const nextTab = useCallback(() => {
    const next = activeIndexRef.current + 1;
    if (next < PORTFOLIO_TABS.length) {
      navigateTo(next);
    }
  }, [navigateTo]);

  const prevTab = useCallback(() => {
    const prev = activeIndexRef.current - 1;
    if (prev >= 0) {
      navigateTo(prev);
    }
  }, [navigateTo]);

  return (
    <Portfolio3DContext.Provider
      value={{
        tabs: PORTFOLIO_TABS,
        activeIndex,
        direction,
        isTransitioning,
        isDeckRoute,
        navigateTo,
        nextTab,
        prevTab,
      }}
    >
      {children}
    </Portfolio3DContext.Provider>
  );
}

export function usePortfolio3D() {
  const ctx = useContext(Portfolio3DContext);
  if (!ctx) {
    throw new Error('usePortfolio3D must be used inside Portfolio3DProvider');
  }
  return ctx;
}
