'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Circle, 
  Search, 
  Terminal, 
  Gamepad2, 
  Globe, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Section from '@/components/common/Section';
import PageHeader from '@/components/common/PageHeader';
import { portfolioService } from '@/core/services/PortfolioService';
import { ISkill } from '@/core/models/PortfolioModels';
import { getDeviconSvgUrl } from '@/shared/lib/devicon';

const getIconColor = (color: string) => {
  if (!color) return 'currentColor';
  const hex = color.toLowerCase().trim();
  if (hex === '#ffffff' || hex === '#000000' || hex === '#fff' || hex === '#000') {
    return 'currentColor';
  }
  return color;
};

const SkillIcon = ({ skill }: { skill: ISkill }) => {
  const [hasError, setHasError] = useState(false);
  const color = getIconColor(skill.color);
  const deviconUrl = getDeviconSvgUrl(skill.icon || skill.name);

  if (!hasError && deviconUrl) {
    return (
      <img
        src={deviconUrl}
        alt={skill.name}
        loading="lazy"
        decoding="async"
        className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110 shrink-0"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-secondary text-foreground shrink-0"
      style={{ color }}
    >
      {skill.name.slice(0, 2).toUpperCase()}
    </div>
  );
};

const TechMarquee = ({ skills }: { skills: ISkill[] }) => {
  const marqueeItems = [...skills, ...skills];

  return (
    <div className="w-full overflow-hidden relative py-6 mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
      <div className="animate-marquee gap-5 items-center">
        {marqueeItems.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="relative group cursor-pointer shrink-0"
            title={skill.name}
          >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border/70 hover:border-foreground/50 transition-all shadow-xs group-hover:scale-105">
              <SkillIcon skill={skill} />
              <span className="text-sm font-bold text-foreground whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TerminalContent = () => {
  const [typedLength, setTypedLength] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const command = 'status --profile kaitodeus';

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev < command.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setShowOutput(true);
          return prev;
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const typedText = command.slice(0, typedLength);

  return (
    <div className="p-5 space-y-3 font-mono text-xs md:text-sm text-foreground/90 min-h-[170px]">
      <div className="flex items-center gap-2 opacity-80">
        <span className="text-emerald-500 font-bold">$</span>
        <span className="font-semibold text-foreground">
          {typedText}
          {!showOutput && (
            <span className="inline-block w-1.5 h-4 bg-foreground ml-1 align-middle animate-pulse" />
          )}
        </span>
      </div>

      {showOutput && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border/40 text-xs animate-in fade-in-50 duration-500">
          <div>
            <span className="font-bold text-muted-foreground">Focus:</span>{' '}
            <span className="text-foreground font-semibold">Software Developer</span>
          </div>
          <div>
            <span className="font-bold text-muted-foreground">Role:</span>{' '}
            <span className="text-foreground font-semibold">SE Intern @ FPT</span>
          </div>
          <div>
            <span className="font-bold text-muted-foreground">Education:</span>{' '}
            <span className="text-foreground font-semibold">Senior IT @ UTH</span>
          </div>
          <div>
            <span className="font-bold text-muted-foreground">Primary:</span>{' '}
            <span className="text-foreground font-semibold">React, Unity, Spring</span>
          </div>
          <div className="sm:col-span-2 text-emerald-500 flex items-center gap-1.5 font-medium pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Environment ready: Clean Architecture &amp; Production Standards</span>
          </div>
        </div>
      )}
    </div>
  );
};

const CATEGORIES = [
  { id: 'all', label: 'All Stack' },
  { id: 'core', label: 'Core / 3D' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
  { id: 'tools', label: 'Tools' },
];

export default function SkillsPage() {
  const allSkills = portfolioService.getSkills();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allSkills.filter((skill) => {
      if (selectedCategory !== 'all' && skill.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q)
      );
    });
  }, [allSkills, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allSkills.length };
    allSkills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [allSkills]);

  return (
    <Section id="skills">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <PageHeader
          title="Technology Stack"
          highlight="& Architecture Arsenal"
        />

        {/* Top Section: Terminal & Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Terminal Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <Card className="bg-card/70 border-border/60 shadow-xl overflow-hidden font-mono backdrop-blur-md h-full flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/60 border-b border-border/60 shrink-0">
                <div className="flex gap-1.5">
                  <Circle className="w-3 h-3 fill-red-500/80 text-red-500/80" />
                  <Circle className="w-3 h-3 fill-yellow-500/80 text-yellow-500/80" />
                  <Circle className="w-3 h-3 fill-green-500/80 text-green-500/80" />
                </div>
                <span className="ml-2 text-muted-foreground text-xs flex items-center gap-1.5 font-medium">
                  <Terminal className="w-3.5 h-3.5 text-foreground" />
                  ~/system/architecture-specs
                </span>
              </div>
              <TerminalContent />
            </Card>
          </div>

          {/* Core Domains Overview (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all p-5 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">Full-Stack Web</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  High-performance web apps built with Next.js 15, React 19, TypeScript, and Spring Boot.
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 mt-3 flex flex-wrap gap-1">
                {['Next.js', 'React', 'TS', 'Tailwind'].map((t) => (
                  <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary/80 text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all p-5 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">3D Simulation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Physics engines, manual transmission, and realistic vehicles simulated in Unity &amp; C#.
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 mt-3 flex flex-wrap gap-1">
                {['Unity', 'C#', 'WebGL', 'Physics'].map((t) => (
                  <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary/80 text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all p-5 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-base">Mobile &amp; Backend</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Native Android with Kotlin, Room DB, PostgreSQL, and containerized Docker services.
                </p>
              </div>
              <div className="pt-3 border-t border-border/40 mt-3 flex flex-wrap gap-1">
                {['Kotlin', 'Compose', 'Docker', 'Postgres'].map((t) => (
                  <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary/80 text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </Card>

          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-foreground text-background shadow-md'
                        : 'bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-background/20 text-background'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-full bg-card/60 border-border/60 focus:border-foreground"
              />
            </div>
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div>
          {filteredSkills.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border/60 rounded-2xl p-8 space-y-3">
              <p className="text-base font-semibold text-foreground">No technologies match your filter</p>
              <p className="text-xs text-muted-foreground">Try clearing the search query or selecting a different category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold text-foreground underline mt-2 inline-block cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSkills.map((skill) => (
                <Card
                  key={skill.name}
                  className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 hover:shadow-lg transition-all duration-300 group p-4 flex flex-col items-center text-center justify-between gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border/40 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform shadow-xs">
                    <SkillIcon skill={skill} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground group-hover:underline">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mt-1">
                      {skill.category}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Marquee Ribbon Banner at bottom */}
        <div className="space-y-4 pt-8 border-t border-border/40">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Always expanding my repertoire
            </p>
          </div>
          <TechMarquee skills={allSkills} />
        </div>

      </div>
    </Section>
  );
}
