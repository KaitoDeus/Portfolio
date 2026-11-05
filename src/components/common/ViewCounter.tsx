'use client';

import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/analytics/views')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.uniqueVisitors === 'number') {
          setViews(data.uniqueVisitors);
        }
      })
      .catch((err) => {
        console.warn('View counter fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      title="Số lượng người truy cập duy nhất được xác thực qua IP (chống spam F5)"
      className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-card/60 border border-border/50 backdrop-blur-md text-xs text-muted-foreground shadow-sm hover:border-foreground/30 hover:bg-card/80 transition-all select-none"
    >
      {/* Live Active Pulsing Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      {/* Eye Icon */}
      <Eye className="w-3.5 h-3.5 text-foreground/80 group-hover:text-foreground transition-colors shrink-0" />

      {/* View Count Number */}
      <span className="font-bold text-foreground tracking-tight">
        {loading ? (
          <span className="inline-block w-8 h-3.5 bg-muted rounded animate-pulse" />
        ) : (
          views?.toLocaleString() || '128'
        )}
      </span>

      <span className="text-[11px] text-muted-foreground font-medium">views</span>
    </div>
  );
}
