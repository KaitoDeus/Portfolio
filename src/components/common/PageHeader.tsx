import React from 'react';
import { cn } from '@/shared/lib/utils';

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  badge,
  title,
  highlight,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4", className)}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-secondary/80 border border-border/60 text-muted-foreground uppercase tracking-widest shadow-xs">
          {badge}
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
        {title} {highlight && <span className="text-muted-foreground font-light">{highlight}</span>}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
