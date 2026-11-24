'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Home,
  RotateCcw,
  ShieldBan,
  Compass,
  ServerCrash,
  FolderKanban,
  KeyRound,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type ErrorCode = '404' | '403' | '500';

interface ErrorStatePageProps {
  code: ErrorCode;
  title?: string;
  description?: string;
  diagnostic?: string;
  onRetry?: () => void;
}

const ERROR_PRESETS: Record<
  ErrorCode,
  {
    icon: React.ElementType;
    badge: string;
    title: string;
    description: string;
    diagnostic: string;
    accentText: string;
    accentGlow: string;
    iconBg: string;
  }
> = {
  '404': {
    icon: Compass,
    badge: 'ROUTE_NOT_FOUND',
    title: 'Page Not Found',
    description:
      'The page you are looking for does not exist, was moved, or the address was typed incorrectly.',
    diagnostic: 'ERR_HTTP_404 // Target resource could not be resolved',
    accentText: 'text-sky-500',
    accentGlow: 'bg-sky-500/15',
    iconBg: 'border-sky-500/30 bg-sky-500/10',
  },
  '403': {
    icon: ShieldBan,
    badge: 'ACCESS_FORBIDDEN',
    title: 'Access Forbidden',
    description:
      'You do not have permission to view this resource. Elevated authorization credentials are required.',
    diagnostic: 'ERR_HTTP_403 // Security policy blocked this request',
    accentText: 'text-red-500',
    accentGlow: 'bg-red-500/15',
    iconBg: 'border-red-500/30 bg-red-500/10',
  },
  '500': {
    icon: ServerCrash,
    badge: 'INTERNAL_SERVER_ERROR',
    title: 'Internal Server Error',
    description:
      'Something went wrong on the server while processing your request. Please try again in a moment.',
    diagnostic: 'ERR_HTTP_500 // Unexpected runtime exception',
    accentText: 'text-amber-500',
    accentGlow: 'bg-amber-500/15',
    iconBg: 'border-amber-500/30 bg-amber-500/10',
  },
};

export default function ErrorStatePage({
  code,
  title,
  description,
  diagnostic,
  onRetry,
}: ErrorStatePageProps) {
  const router = useRouter();
  const preset = ERROR_PRESETS[code];
  const Icon = preset.icon;

  return (
    <div className="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-8 relative">
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] ${preset.accentGlow} rounded-full blur-3xl pointer-events-none -z-10`}
      />

      <Card className="w-full max-w-lg border-border/70 bg-card/75 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden py-0 gap-0">
        <CardContent className="p-6 sm:p-10 text-center space-y-6">
          {/* Status Icon & Pill Badge */}
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-inner ${preset.iconBg}`}
            >
              <Icon className={`w-8 h-8 ${preset.accentText}`} />
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/60 text-[11px] font-mono font-semibold text-muted-foreground tracking-wider">
              <span className={`w-1.5 h-1.5 rounded-full ${preset.accentText} bg-current`} />
              {preset.badge}
            </span>
          </div>

          {/* Big Numeric Status Code & Headline */}
          <div className="space-y-2">
            <div className="text-6xl sm:text-7xl font-black tracking-tighter text-foreground leading-none select-none">
              {code}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {title || preset.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              {description || preset.description}
            </p>
          </div>

          {/* Terminal Diagnostic Strip */}
          <div className="px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 font-mono text-[11px] text-muted-foreground break-all">
            $ {diagnostic || preset.diagnostic}
          </div>

          {/* Primary & Contextual Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {code === '500' && (
              <Button
                type="button"
                onClick={onRetry || (() => window.location.reload())}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold px-5 h-10 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                <span>Try Again</span>
              </Button>
            )}

            <Button
              asChild
              variant={code === '500' ? 'outline' : 'default'}
              className={`rounded-full font-semibold px-5 h-10 ${
                code === '500'
                  ? ''
                  : 'bg-foreground text-background hover:bg-foreground/90'
              }`}
            >
              <Link href="/" className="flex items-center gap-1.5">
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </Button>

            {code === '404' && (
              <Button asChild variant="outline" className="rounded-full font-semibold px-5 h-10">
                <Link href="/projects" className="flex items-center gap-1.5">
                  <FolderKanban className="w-4 h-4" />
                  <span>Projects</span>
                </Link>
              </Button>
            )}

            {code === '403' && (
              <Button asChild variant="outline" className="rounded-full font-semibold px-5 h-10">
                <Link href="/admin/login" className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4" />
                  <span>Admin Sign In</span>
                </Link>
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="rounded-full font-semibold px-4 h-10 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Go Back</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
