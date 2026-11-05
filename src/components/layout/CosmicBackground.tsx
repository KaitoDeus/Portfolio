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
      className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden select-none"
    >
      {/* 1. Looping HTML5 Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/img/background/cosmic_pixel_night_sky.webp"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 dark:opacity-85 transition-opacity duration-700"
      >
        <source src="/assets/video/background.mp4" type="video/mp4" />
      </video>

      {/* 2. Soft Gradient & Vignette Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/50 dark:bg-background/40 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
    </div>
  );
}
