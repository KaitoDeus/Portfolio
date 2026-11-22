'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Terminal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
        className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-110 shrink-0"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-secondary text-foreground shrink-0"
      style={{ color }}
    >
      {skill.name.slice(0, 2).toUpperCase()}
    </div>
  );
};

const TerminalContent = () => {
  const [typedLength, setTypedLength] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const command = 'status --profile kaito';

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
    <div className="p-4 sm:p-5 font-mono text-xs text-foreground/90 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-emerald-500 font-bold text-sm">$</span>
        <span className="font-semibold text-foreground text-sm">
          {typedText}
          {!showOutput && (
            <span className="inline-block w-2 h-4 bg-foreground ml-1 align-middle animate-pulse" />
          )}
        </span>
      </div>

      {showOutput && (
        <div className="space-y-2.5 pt-2.5 border-t border-border/40 animate-in fade-in-50 duration-300">
          <div>
            <span className="text-muted-foreground font-medium block text-[11px]">
              Specialization
            </span>
            <span className="text-foreground font-bold text-xs sm:text-sm">
              Software &amp; Game Development
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 font-medium text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Environment operational • Production ready</span>
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
    <section id="skills" className="w-full max-w-[1520px] mx-auto flex flex-col gap-5 relative z-10">
      {/* Compact Horizontal Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Skills &amp; Tech Stack
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Technologies, frameworks, and tools powering production systems.
          </p>
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs rounded-full bg-card/70 backdrop-blur-md border-border/60 focus:border-foreground"
          />
        </div>
      </div>

      {/* Horizontal Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[calc(100vh-13rem)] lg:max-h-[680px]">
        {/* Left Sidebar: Terminal + Category Filters */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:h-full">
          {/* Interactive Terminal */}
          <Card className="border-border/60 bg-card/65 backdrop-blur-xl shadow-lg overflow-hidden font-mono rounded-2xl py-0 gap-0 shrink-0">
            <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/50 border-b border-border/60 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-muted-foreground font-mono flex items-center gap-1.5 font-medium">
                  <Terminal className="w-3.5 h-3.5 text-foreground" />
                  <span>~/kaito/specs</span>
                </span>
              </div>
              <span className="text-muted-foreground/60 text-[10px] font-mono">bash</span>
            </div>
            <TerminalContent />
          </Card>

          {/* Category Filter Panel */}
          <Card className="border-border/60 bg-card/65 backdrop-blur-xl shadow-lg rounded-2xl p-4 flex flex-col gap-3 grow overflow-y-auto py-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-foreground text-background shadow-sm'
                        : 'bg-secondary/60 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-background/20 text-background'
                          : 'bg-background/60 text-muted-foreground'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Panel: Compact Skill Matrix */}
        <Card className="lg:col-span-8 border-border/60 bg-card/55 backdrop-blur-xl shadow-lg rounded-2xl p-4 sm:p-5 lg:h-full overflow-y-auto py-4">
          {filteredSkills.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 border border-dashed border-border/60 rounded-2xl p-6 space-y-3">
              <p className="text-base font-semibold text-foreground">
                No technologies match your filter
              </p>
              <p className="text-xs text-muted-foreground">
                Try clearing the search query or selecting a different category.
              </p>
              <button
                type="button"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredSkills.map((skill) => (
                <Card
                  key={skill.name}
                  className="border-border/60 bg-card/70 hover:border-foreground/40 hover:shadow-md transition-all duration-300 group p-3 flex flex-col items-center text-center justify-center gap-2.5 py-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/60 border border-border/40 flex items-center justify-center p-2 group-hover:scale-110 transition-transform shadow-xs">
                    <SkillIcon skill={skill} />
                  </div>
                  <div className="min-w-0 w-full">
                    <h4 className="font-bold text-xs sm:text-sm text-foreground truncate group-hover:underline">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mt-0.5">
                      {skill.category}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
