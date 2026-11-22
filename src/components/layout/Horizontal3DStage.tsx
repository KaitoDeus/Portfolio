'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio3D, PORTFOLIO_TABS } from '@/shared/context/Portfolio3DContext';
import HomePage from '@/sections/Home/HomePage';
import AboutPage from '@/sections/About/AboutPage';
import SkillsPage from '@/sections/Skills/SkillsPage';
import ProjectsPage from '@/sections/Projects/ProjectsPage';
import ContactPage from '@/sections/Contact/ContactPage';
import { cn } from '@/shared/lib/utils';

const slideVariants = {
  enter: (dir: 1 | -1) => ({
    x: dir > 0 ? '45%' : '-45%',
    rotateY: dir > 0 ? 32 : -32,
    z: -240,
    scale: 0.88,
    opacity: 0,
  }),
  center: {
    x: '0%',
    rotateY: 0,
    z: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (dir: 1 | -1) => ({
    x: dir > 0 ? '-45%' : '45%',
    rotateY: dir > 0 ? -32 : 32,
    z: -240,
    scale: 0.88,
    opacity: 0,
  }),
};

/**
 * Checks whether any ancestor of the wheel target can still scroll in the gesture direction
 * before yielding control to horizontal tab navigation.
 */
function canAncestorScroll(
  target: EventTarget | null,
  boundaryRoot: HTMLElement | null,
  deltaX: number,
  deltaY: number
): boolean {
  let node = target instanceof HTMLElement ? target : null;
  const preferHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  while (node && node !== boundaryRoot) {
    const style = window.getComputedStyle(node);

    // Check horizontal scrollable containers (e.g. horizontal Projects carousel)
    const isHorizontalScrollable =
      (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
      node.scrollWidth > node.clientWidth + 4;

    if (isHorizontalScrollable && (preferHorizontal || node.dataset.horizontalScroll === 'true')) {
      const effectiveDelta = preferHorizontal ? deltaX : deltaY;
      if (effectiveDelta > 0 && node.scrollLeft + node.clientWidth < node.scrollWidth - 2) {
        return true;
      }
      if (effectiveDelta < 0 && node.scrollLeft > 2) {
        return true;
      }
    }

    // Check vertical scrollable containers (e.g. Chat messages or mobile card overflow)
    const isVerticalScrollable =
      (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
      node.scrollHeight > node.clientHeight + 4;

    if (isVerticalScrollable && !preferHorizontal) {
      if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 2) {
        return true;
      }
      if (deltaY < 0 && node.scrollTop > 2) {
        return true;
      }
    }

    node = node.parentElement;
  }

  return false;
}

export default function Horizontal3DStage() {
  const { activeIndex, direction, navigateTo, nextTab, prevTab } =
    usePortfolio3D();

  const stageRef = useRef<HTMLDivElement>(null);
  const lastTriggerTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const resetAccumulatorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Wheel scroll -> horizontal 3D tab switching
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;

      // Do not hijack wheel while modals are open
      if (document.querySelector('[data-cert-modal="true"]')) return;

      const dominantDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominantDelta) < 2) return;

      // Allow inner scrollable panels (like AI chat or horizontal project carousel) to scroll cleanly first
      if (canAncestorScroll(e.target, stageRef.current, e.deltaX, e.deltaY)) {
        return;
      }

      const now = Date.now();
      // Cooldown prevents trackpad inertia from skipping multiple sections in one flick
      if (now - lastTriggerTimeRef.current < 800) {
        e.preventDefault();
        return;
      }

      accumulatedDeltaRef.current += dominantDelta;

      if (resetAccumulatorTimerRef.current) {
        clearTimeout(resetAccumulatorTimerRef.current);
      }
      resetAccumulatorTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 180);

      if (Math.abs(accumulatedDeltaRef.current) >= 40) {
        const moveForward = accumulatedDeltaRef.current > 0;
        accumulatedDeltaRef.current = 0;
        lastTriggerTimeRef.current = now;

        e.preventDefault();
        if (moveForward) {
          nextTab();
        } else {
          prevTab();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (resetAccumulatorTimerRef.current) {
        clearTimeout(resetAccumulatorTimerRef.current);
      }
    };
  }, [nextTab, prevTab]);

  // Keyboard ArrowLeft / ArrowRight support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (document.querySelector('[data-cert-modal="true"]')) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextTab();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevTab();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTab, prevTab]);

  // Touch swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;
      if (document.querySelector('[data-cert-modal="true"]')) return;

      // Ignore horizontal swipes inside a scrollable horizontal carousel unless at its boundary
      const dx = touchStartRef.current.x - e.changedTouches[0].clientX;
      const dy = touchStartRef.current.y - e.changedTouches[0].clientY;
      touchStartRef.current = null;

      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        if (canAncestorScroll(e.target, stageRef.current, dx, 0)) {
          return;
        }
        if (dx > 0) {
          nextTab();
        } else {
          prevTab();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextTab, prevTab]);

  const renderTabContent = (index: number) => {
    switch (index) {
      case 0:
        return <HomePage />;
      case 1:
        return <AboutPage />;
      case 2:
        return <SkillsPage />;
      case 3:
        return <ProjectsPage />;
      case 4:
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {/* 3D Perspective Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden"
        style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={PORTFOLIO_TABS[activeIndex]?.id ?? activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.68,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full h-full overflow-y-auto lg:overflow-hidden flex flex-col justify-start lg:justify-center px-4 sm:px-6 lg:px-10 pt-16 pb-24 lg:pt-12 lg:pb-24 will-change-transform"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {renderTabContent(activeIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Bottom Horizontal Progress Rail */}
      <div className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-center gap-3 px-4 py-2 rounded-full bg-card/80 backdrop-blur-2xl border border-border/50 shadow-2xl scale-105">
        <button
          type="button"
          onClick={prevTab}
          disabled={activeIndex === 0}
          aria-label="Previous section"
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 px-1.5">
          {PORTFOLIO_TABS.map((tab, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => navigateTo(idx)}
                title={tab.label}
                aria-label={`Go to ${tab.label}`}
                className={cn(
                  'flex items-center gap-2 rounded-full transition-all duration-300 cursor-pointer',
                  isActive
                    ? 'px-4 py-1.5 bg-foreground text-background text-xs sm:text-sm font-bold shadow-sm'
                    : 'w-2.5 h-2.5 bg-muted-foreground/35 hover:bg-foreground/65 hover:scale-125'
                )}
              >
                {isActive && (
                  <>
                    <span className="opacity-65 font-mono">0{idx + 1}</span>
                    <span>{tab.label}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={nextTab}
          disabled={activeIndex === PORTFOLIO_TABS.length - 1}
          aria-label="Next section"
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
