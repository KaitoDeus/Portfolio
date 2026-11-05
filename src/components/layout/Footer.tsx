'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { portfolioService } from '@/core/services/PortfolioService';

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const { name, socialLinks } = portfolioService.getRawData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-card/40 backdrop-blur-xl relative z-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: Brand & Availability */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-foreground hover:opacity-80 transition-opacity">
                {name} <span className="text-muted-foreground font-light">/ Portfolio</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Software Engineer Intern at FPT Software & Senior IT Student at University of Transport Ho Chi Minh City. Passionate about Full-Stack, Game & Simulation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Software Developer roles
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium inline-flex items-center gap-1 group py-1"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Connect */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform.toLowerCase()] || Github;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/60 border border-border/60 hover:border-foreground/50 hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-all"
                    title={link.label || link.platform}
                    aria-label={link.label || link.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Based in Ho Chi Minh City, Vietnam.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {currentYear} {name} (Võ Anh Khải). All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Built with Next.js 15, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
