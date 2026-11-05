'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function CosmicBackground() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden select-none"
    >
      {/* 1. Looping Cosmic Animated Background (WebP with GIF Fallback) */}
      <picture className="absolute inset-0 w-full h-full">
        <source srcSet="/assets/img/background/cosmic_pixel_night_sky.webp" type="image/webp" />
        <img
          src="/assets/img/background/cosmic_pixel_night_sky.gif"
          alt=""
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-30 dark:opacity-85 transition-opacity duration-700"
        />
      </picture>

      {/* 2. Soft Gradient & Vignette Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/50 dark:bg-background/40 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
    </div>
  );
}
