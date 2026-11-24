import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITimelineItem } from '@/core/models/PortfolioModels';
import { getImageSrc } from '@/shared/lib/utils';

const renderTextWithLinks = (text: string) => {
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = mdLinkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-foreground hover:opacity-80 transition-opacity"
        >
          {label}
        </a>
      );
    } else if (match[3]) {
      const url = match[3];
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-foreground hover:opacity-80 transition-opacity"
        >
          {url}
        </a>
      );
    }

    lastIndex = mdLinkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

interface ITimelineCardProps {
  title: string;
  icon: React.ElementType;
  items: ITimelineItem[];
  colorClass: string;
  embedded?: boolean;
}

export function TimelineItemList({
  icon: Icon,
  items,
}: {
  icon: React.ElementType;
  items: ITimelineItem[];
}) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const logoSrc = getImageSrc(item.logo);

        return (
          <div key={index} className="flex gap-3.5 group">
            <div className="shrink-0">
              <div
                className={`w-12 h-12 flex items-center justify-center transition-colors ${
                  item.logo
                    ? 'bg-transparent p-0.5'
                    : 'rounded-xl overflow-hidden bg-secondary/40 border border-border/40 group-hover:border-foreground/40'
                }`}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={item.title || ''}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </div>
            </div>

            <div className="grow min-w-0 space-y-1">
              <h4 className="text-sm sm:text-base font-bold group-hover:text-foreground transition-colors leading-tight">
                {item.title}
              </h4>

              {item.subtitle && (
                <p className="text-muted-foreground text-xs font-medium">
                  {item.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold">{item.year}</span>
              </div>

              {item.extra && (
                <div className="text-xs font-medium text-foreground/85 whitespace-pre-wrap leading-relaxed pt-1">
                  {renderTextWithLinks(item.extra)}
                </div>
              )}

              {item.details && item.details.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {item.details.map((detail: string, dIdx: number) => (
                    <li
                      key={dIdx}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-foreground/50 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TimelineCard({
  title,
  icon: Icon,
  items,
  colorClass,
  embedded = false,
}: ITimelineCardProps) {
  if (embedded) {
    return <TimelineItemList icon={Icon} items={items} />;
  }

  return (
    <div>
      <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2.5 font-bold text-xl ${colorClass}`}>
            <Icon className="w-6 h-6" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimelineItemList icon={Icon} items={items} />
        </CardContent>
      </Card>
    </div>
  );
}
