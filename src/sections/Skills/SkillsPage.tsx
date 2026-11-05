'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Gamepad2, 
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

const TerminalContent = () => {
  const [typedLength, setTypedLength] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const command = 'status --profile kaitodeus --mode arcade';

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
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const typedText = command.slice(0, typedLength);

  return (
    <div className="relative p-6 sm:p-8 font-mono space-y-6 min-h-[260px] bg-black/85 dark:bg-black/95 select-none overflow-hidden text-emerald-400">
      {/* Subtle CRT retro scanline overlay */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-35 z-10" 
      />

      {/* Terminal prompt command line */}
      <div className="relative z-20 flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg">
        <span className="text-emerald-500 font-extrabold select-none">
          KAITO@ARCADE-ENGINE:~$
        </span>
        <span className="font-bold text-white tracking-wide">
          {typedText}
          {!showOutput && (
            <span className="inline-block w-2.5 h-5 bg-emerald-400 ml-1.5 align-middle animate-pulse shadow-[0_0_10px_#10b981]" />
          )}
        </span>
      </div>

      {/* Retro Pixel Gaming Stats Output */}
      {showOutput && (
        <div className="relative z-20 space-y-5 pt-4 border-t-2 border-dashed border-emerald-500/30 text-xs sm:text-sm animate-in fade-in-50 duration-500">
          
          {/* Top Arcade Player Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-950/40 border border-emerald-500/40 px-4 py-2.5 rounded-lg text-emerald-300">
            <div className="flex items-center gap-2 font-bold tracking-wider text-xs sm:text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>[PLAYER 1: READY]</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-amber-400 font-bold">★ LVL: 99</span>
              <span className="text-cyan-400 font-bold">♥ HP: 100%</span>
              <span className="text-purple-400 font-bold">✦ MANA: FULL</span>
            </div>
          </div>

          {/* Core System Specs Grid (Removed education, role, primary) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1.5 bg-secondary/10 p-3.5 rounded-lg border border-emerald-500/20">
              <div className="text-[11px] uppercase tracking-widest text-emerald-500/70 font-bold flex items-center gap-1.5">
                <span>▸</span> SPECIALIZATION
              </div>
              <div className="text-white font-bold text-sm sm:text-base">
                Software &amp; Game Developer
              </div>
            </div>

            <div className="space-y-1.5 bg-secondary/10 p-3.5 rounded-lg border border-emerald-500/20">
              <div className="text-[11px] uppercase tracking-widest text-emerald-500/70 font-bold flex items-center gap-1.5">
                <span>▸</span> SYSTEM ARCHITECTURE
              </div>
              <div className="text-cyan-300 font-bold text-sm sm:text-base">
                Clean Architecture &amp; Production Standards
              </div>
            </div>

            <div className="space-y-1.5 bg-secondary/10 p-3.5 rounded-lg border border-emerald-500/20">
              <div className="text-[11px] uppercase tracking-widest text-emerald-500/70 font-bold flex items-center gap-1.5">
                <span>▸</span> SYSTEM INTEGRITY
              </div>
              <div className="flex items-center gap-3">
                <div className="text-emerald-400 font-bold text-xs sm:text-sm tracking-widest">
                  [████████████████████]
                </div>
                <span className="text-white font-bold text-xs">100%</span>
              </div>
            </div>

            <div className="space-y-1.5 bg-secondary/10 p-3.5 rounded-lg border border-emerald-500/20">
              <div className="text-[11px] uppercase tracking-widest text-emerald-500/70 font-bold flex items-center gap-1.5">
                <span>▸</span> QUEST STATUS
              </div>
              <div className="text-amber-300 font-bold text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ready for High-Impact Projects</span>
              </div>
            </div>

          </div>

          {/* Footer Terminal Bar */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-emerald-400/80 pt-2 border-t border-emerald-500/20">
            <span>&gt;&gt; PIXEL ENGINE LOADED // ALL MODULES OPERATIONAL</span>
            <span className="text-muted-foreground hidden sm:inline animate-pulse">
              EXPLORE TECH STACK BELOW ↓
            </span>
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
        <PageHeader title="Skills" />

        {/* Top Section: Full-Width Retro Game Pixel Terminal Console */}
        <div className="w-full">
          <Card className="bg-black/90 border-2 border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.15)] overflow-hidden font-mono backdrop-blur-md rounded-2xl">
            {/* Retro Arcade Terminal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-950/70 border-b-2 border-emerald-500/30 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_6px_#eab308]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_6px_#22c55e]" />
                </div>
                <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-emerald-400" />
                  <span>ARCADE://SYSTEM-SPEC.DAT</span>
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-emerald-400/80">
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-500/40 text-emerald-300">
                  60 FPS
                </span>
                <span className="text-emerald-400 font-bold">PIXEL-OS v2.6</span>
              </div>
            </div>
            
            {/* Terminal Screen Body */}
            <TerminalContent />
          </Card>
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

      </div>
    </Section>
  );
}
