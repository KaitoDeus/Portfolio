'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  FolderKanban, 
  User, 
  Mail 
} from 'lucide-react';
import { portfolioService } from '@/core/services/PortfolioService';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const data = portfolioService.getRawData();
  const { name } = data;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] sm:min-h-[calc(100vh-16rem)] px-4 sm:px-6 relative text-center">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] h-[340px] sm:h-[460px] bg-foreground/[0.03] dark:bg-foreground/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 space-y-6 sm:space-y-8 my-auto">
        
        {/* Main Typography Headline */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight sm:leading-none">
            <span className="text-muted-foreground font-light">Hi, I am </span>
            <span className="text-foreground">{name}</span>
          </h1>

          {/* Tagline / Role */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium tracking-tight">
            I&apos;m a <span className="text-foreground font-bold">Software Developer</span>
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center w-full max-w-xs sm:max-w-none pt-2 sm:pt-4">
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/80 font-bold text-base py-6 px-8 rounded-full shadow-xl hover:scale-105 transition-all"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="font-bold text-base py-6 px-8 rounded-full border-border/70 hover:bg-foreground/5 hover:border-foreground/40 transition-all"
          >
            <Link href="/about" className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>About Me</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="font-bold text-base py-6 px-8 rounded-full bg-secondary/80 hover:bg-secondary transition-all"
          >
            <Link href="/contact" className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Get in Touch</span>
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
