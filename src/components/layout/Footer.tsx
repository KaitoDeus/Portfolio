'use client';

import { portfolioService } from '@/core/services/PortfolioService';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function Footer() {
  const { name, personalInfo, socialLinks } = portfolioService.getRawData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-card/30 backdrop-blur-md relative z-20 transition-colors py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
        <p className="text-center sm:text-left">
          © {currentYear} <span className="text-foreground font-semibold">{name}</span> ({personalInfo?.fullname || 'Võ Anh Khải'}). All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.platform.toLowerCase()] || Github;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                  aria-label={link.label || link.platform}
                  title={link.label || link.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
          <span className="text-border/60 hidden sm:inline">|</span>
          <span className="text-xs text-muted-foreground/80 hidden sm:inline">
            Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
