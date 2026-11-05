'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CosmicBackground() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback, video will remain paused or show poster
      });
    }
  }, []);

  if (isAdmin) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Looping Animated GIF/WebP Background Layer (Immediate, universal playback) */}
      <picture className="absolute inset-0 w-full h-full">
        <source srcSet="/assets/video/background.webp" type="image/webp" />
        <img
          src="/assets/video/background.gif"
          alt=""
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-55"
        />
      </picture>

      {/* 2. Looping 4K HTML5 Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 dark:opacity-55 transition-opacity duration-700"
      >
        <source src="/assets/video/background.mp4" type="video/mp4" />
      </video>

      {/* 3. Subtle overlay to maintain text readability without washing out colors */}
      <div className="absolute inset-0 bg-background/25 dark:bg-black/40 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
    </div>
  );
}
