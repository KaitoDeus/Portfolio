import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITimelineItem } from '@/core/models/PortfolioModels';

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
}

export function TimelineCard({
  title,
  icon: Icon,
  items,
  colorClass,
}: ITimelineCardProps) {
  return (
    <div>
      <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 font-bold ${colorClass}`}>
            <Icon className="w-6 h-6" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="shrink-0">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors overflow-hidden ${
                    item.logo
                      ? 'bg-transparent'
                      : 'bg-secondary/40 border border-border/40 group-hover:border-foreground/40'
                  }`}
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title || ''}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </div>
              </div>

              <div className="grow space-y-1">
                <h4 className="text-lg font-bold group-hover:text-foreground transition-colors leading-tight">
                  {item.title}
                </h4>

                {item.subtitle && (
                  <p className="text-muted-foreground text-sm font-medium">
                    {item.subtitle}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">{item.year}</span>
                </div>

                {item.extra && (
                  <p className="text-sm font-medium text-foreground/90 whitespace-pre-wrap">
                    {renderTextWithLinks(item.extra)}
                  </p>
                )}

                {item.details && item.details.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {item.details.map((detail: string, dIdx: number) => (
                      <li
                        key={dIdx}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-foreground/50 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
