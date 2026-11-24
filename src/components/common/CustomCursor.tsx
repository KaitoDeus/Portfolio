'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';

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

type CursorMode = 'default' | 'pointer' | 'text';

function detectCursorMode(target: EventTarget | null): CursorMode {
  let node = target instanceof Element ? target : null;
  while (node) {
    const tag = node.tagName;
    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      (node instanceof HTMLElement && node.isContentEditable)
    ) {
      return 'text';
    }
    if (
      tag === 'A' ||
      tag === 'BUTTON' ||
      node.getAttribute('role') === 'button' ||
      node.getAttribute('data-cursor') === 'pointer' ||
      node.classList.contains('cursor-pointer')
    ) {
      return 'pointer';
    }
    node = node.parentElement;
  }
  return 'default';
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribePointerCapability,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const pointer = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;
    let isPressed = false;
    let mode: CursorMode = 'default';
    let rafId = 0;

    const applyVisualState = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      if (!visible) {
        ring.style.opacity = '0';
        dot.style.opacity = '0';
        return;
      }

      if (mode === 'text') {
        ring.style.opacity = '0.35';
        dot.style.opacity = '0';
        ring.dataset.mode = 'text';
      } else if (mode === 'pointer') {
        ring.style.opacity = '1';
        dot.style.opacity = isPressed ? '0.9' : '0.45';
        ring.dataset.mode = 'pointer';
      } else {
        ring.style.opacity = '1';
        dot.style.opacity = '1';
        ring.dataset.mode = 'default';
      }

      ring.dataset.pressed = isPressed ? 'true' : 'false';
      dot.dataset.pressed = isPressed ? 'true' : 'false';
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      if (!visible) {
        ringPos.x = pointer.x;
        ringPos.y = pointer.y;
        visible = true;
      }

      mode = detectCursorMode(e.target);
      applyVisualState();
    };

    const handleMouseDown = () => {
      isPressed = true;
      applyVisualState();
    };

    const handleMouseUp = () => {
      isPressed = false;
      applyVisualState();
    };

    const handleMouseLeave = () => {
      visible = false;
      applyVisualState();
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      // Smooth exponential follow for the outer ring
      ringPos.x += (pointer.x - ringPos.x) * 0.18;
      ringPos.y += (pointer.y - ringPos.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Trailing Outer Circle Ring */}
      <div
        ref={ringRef}
        data-mode="default"
        data-pressed="false"
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 -ml-[18px] -mt-[18px] w-9 h-9 rounded-full border-[1.5px] border-foreground/75 bg-foreground/[0.03] backdrop-blur-[1px] transition-[width,height,margin,background-color,border-color,scale,opacity] duration-200 ease-out will-change-transform
          data-[mode=pointer]:w-14 data-[mode=pointer]:h-14 data-[mode=pointer]:-ml-7 data-[mode=pointer]:-mt-7 data-[mode=pointer]:bg-foreground/10 data-[mode=pointer]:border-foreground
          data-[mode=text]:w-6 data-[mode=text]:h-6 data-[mode=text]:-ml-3 data-[mode=text]:-mt-3
          data-[pressed=true]:scale-75"
      />

      {/* Precision Center Core Dot */}
      <div
        ref={dotRef}
        data-pressed="false"
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-foreground shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-[scale,opacity] duration-150 will-change-transform
          data-[pressed=true]:scale-50"
      />
    </div>
  );
}
