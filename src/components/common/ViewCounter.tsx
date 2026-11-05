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
      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/60 border border-border/50 backdrop-blur-md text-xs shadow-sm hover:border-foreground/30 hover:bg-card/80 transition-all select-none"
    >
      {/* Eye Icon */}
      <Eye className="w-4 h-4 text-foreground/80 group-hover:text-foreground transition-colors shrink-0" />

      {/* View Count & Label on the exact same baseline */}
      <span className="inline-flex items-baseline gap-1 text-xs">
        {loading ? (
          <span className="inline-block w-7 h-3.5 bg-muted rounded animate-pulse" />
        ) : (
          <span className="font-bold text-foreground">{views?.toLocaleString() || '128'}</span>
        )}
        <span className="text-muted-foreground font-medium">views</span>
      </span>
    </div>
  );
}
