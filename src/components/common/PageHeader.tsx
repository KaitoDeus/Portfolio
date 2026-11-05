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
  title,
  highlight,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3", className)}>
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
