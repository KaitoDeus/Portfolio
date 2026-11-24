'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const subscribePointerCapability = (callback: () => void) => {
  const hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  hoverMq.addEventListener('change', callback);
  motionMq.addEventListener('change', callback);
  return () => {
    hoverMq.removeEventListener('change', callback);
    motionMq.removeEventListener('change', callback);
  };
};

const getPointerSnapshot = () => {
  if (typeof window === 'undefined') return false;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return hasFinePointer && !prefersReducedMotion;
};

const getPointerServerSnapshot = () => false;

interface CursorHoverState {
  active: boolean;
  text: string;
}

function getHoverState(target: EventTarget | null): CursorHoverState {
  const el = target instanceof Element ? target : null;
  if (!el) return { active: false, text: '' };

  const textTrigger = el.closest('[data-cursor-text]');
  if (textTrigger) {
    const label = textTrigger.getAttribute('data-cursor-text') || '';
    if (label) {
      return { active: true, text: label };
    }
  }

  const interactive = el.closest('a, button, [role="button"], .cursor-pointer');
  if (interactive) {
    return { active: true, text: '' };
  }

  return { active: false, text: '' };
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribePointerCapability,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 18, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 18, mass: 0.2 });

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoverState, setHoverState] = useState<CursorHoverState>({ active: false, text: '' });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible((prev) => (prev ? prev : true));

      const next = getHoverState(e.target);
      setHoverState((prev) =>
        prev.active === next.active && prev.text === next.text ? prev : next
      );
    };

    const handleMouseOver = (e: MouseEvent) => {
      const next = getHoverState(e.target);
      setHoverState((prev) =>
        prev.active === next.active && prev.text === next.text ? prev : next
      );
    };

    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    const handleMouseLeave = () => {
      setVisible(false);
      setPressed(false);
      setHoverState({ active: false, text: '' });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const hasText = Boolean(hoverState.text);
  const isHovered = hoverState.active && !hasText;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[999999]"
      style={{
        x: springX,
        y: springY,
        mixBlendMode: 'difference',
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="flex items-center justify-center bg-white rounded-full select-none -translate-x-1/2 -translate-y-1/2 transition-[width,height,padding,top,left,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          position: 'absolute',
          top: hasText ? '28px' : isHovered ? '24px' : '16px',
          left: hasText ? '28px' : isHovered ? '24px' : '16px',
          width: hasText ? 'max-content' : isHovered ? '32px' : '16px',
          height: hasText ? '34px' : isHovered ? '32px' : '16px',
          padding: hasText ? '0 14px' : '0',
          transform: `translate(-50%, -50%) scale(${pressed ? 0.78 : 1})`,
        }}
      >
        <AnimatePresence mode="wait">
          {hasText && (
            <motion.span
              key={hoverState.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="text-black text-[12px] font-semibold tracking-tight whitespace-nowrap"
            >
              {hoverState.text}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
