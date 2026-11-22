'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/shared/hooks/useProjects';
import { getImageSrc } from '@/shared/lib/utils';
import { IProject } from '@/core/models/PortfolioModels';

const FILTER_TAGS = [
  { id: 'all', label: 'All Projects' },
  { id: 'unity', label: 'Unity & 3D' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI & Algorithms' },
];

const PAGE_SIZE = 3;

const pageVariants = {
  enter: (dir: 1 | -1) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: 1 | -1) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function ProjectsPage() {
  const { projects, loading } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageDirection, setPageDirection] = useState<1 | -1>(1);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedFilter !== 'all') {
      result = result.filter((p) => {
        const text = (p.title + ' ' + p.role + ' ' + (p.technologies || []).join(' ')).toLowerCase();
        if (selectedFilter === 'unity') return text.includes('unity') || text.includes('3d') || text.includes('simulator');
        if (selectedFilter === 'web') return text.includes('web') || text.includes('react') || text.includes('next.js') || text.includes('ecommerce');
        if (selectedFilter === 'mobile') return text.includes('android') || text.includes('kotlin') || text.includes('mobile');
        if (selectedFilter === 'ai') return text.includes('ai') || text.includes('python') || text.includes('algorithm') || text.includes('puzzle');
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          (p.technologies || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      const timeA = a.startDate ? Date.parse(a.startDate) : 0;
      const timeB = b.startDate ? Date.parse(b.startDate) : 0;
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [projects, selectedFilter, searchQuery, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages - 1);
  const visibleProjects = filteredProjects.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  );

  const handlePrevPage = () => {
    if (safePage <= 0) return;
    setPageDirection(-1);
    setCurrentPage(safePage - 1);
  };

  const handleNextPage = () => {
    if (safePage >= totalPages - 1) return;
    setPageDirection(1);
    setCurrentPage(safePage + 1);
  };

  return (
    <section id="projects" className="w-full max-w-[1540px] mx-auto flex flex-col gap-5 relative z-10">
      {/* Compact Top Header + Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-1">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Featured software, AI, and 3D game builds ({filteredProjects.length} total).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 p-2 rounded-2xl bg-card/65 border border-border/60 backdrop-blur-xl shadow-xs">
          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {FILTER_TAGS.map((tag) => {
              const isActive = selectedFilter === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(tag.id);
                    setCurrentPage(0);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-foreground text-background shadow-xs font-bold'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="relative w-40 sm:w-52">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
                className="pl-8 h-8 text-xs rounded-full bg-background/60 border-border/60"
              />
            </div>

            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as 'newest' | 'oldest');
                setCurrentPage(0);
              }}
              className="h-8 px-2.5 text-xs rounded-full bg-secondary/80 border border-border/60 text-foreground font-semibold cursor-pointer outline-none shrink-0"
              aria-label="Sort order"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

            {/* Pagination Arrows (3 projects per page) */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-border/50">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={safePage === 0}
                aria-label="Previous 3 projects"
                className="p-1.5 rounded-full bg-secondary/80 hover:bg-foreground hover:text-background text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-semibold text-muted-foreground min-w-[2.5rem] text-center select-none">
                {safePage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={safePage >= totalPages - 1}
                aria-label="Next 3 projects"
                className="p-1.5 rounded-full bg-secondary/80 hover:bg-foreground hover:text-background text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Paginated 3-Column Showcase Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-foreground" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/60 rounded-3xl p-8 space-y-3 bg-card/40 backdrop-blur-md">
          <p className="text-lg font-bold text-foreground">No projects match your query</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or clearing selected category filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('all');
              setCurrentPage(0);
            }}
            className="mt-2 rounded-full cursor-pointer"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        <AnimatePresence mode="wait" custom={pageDirection}>
          <motion.div
            key={`${selectedFilter}-${sortOrder}-${searchQuery}-${safePage}`}
            custom={pageDirection}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleProjects.map((project: IProject) => {
              const projectImgSrc = getImageSrc(project.image);
              const isSimulator = project.id === 'vietnam-b2-driving-simulator';
              const isGithubFallback = Boolean(
                project.link &&
                  project.githubLink &&
                  project.link.trim().toLowerCase() === project.githubLink.trim().toLowerCase()
              );
              const hasLiveDemo = Boolean(project.link && !isGithubFallback) || isSimulator;
              const isHabitFlow = project.id === 'habitflow';

              return (
                <Card
                  key={project.id}
                  className="p-0 gap-0 overflow-hidden border-border/60 bg-card/70 backdrop-blur-xl text-card-foreground transition-all duration-300 hover:border-foreground/50 hover:shadow-2xl flex flex-col group h-[440px] lg:h-[485px] rounded-2xl"
                >
                  {/* Thumbnail */}
                  <div
                    className={`overflow-hidden bg-secondary/30 relative h-48 lg:h-56 shrink-0 border-b border-border/40 flex items-center justify-center ${
                      isHabitFlow ? 'p-2' : ''
                    }`}
                  >
                    <img
                      src={projectImgSrc}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className={
                        isHabitFlow
                          ? 'h-full w-auto max-w-full object-contain mx-auto drop-shadow-md rounded-lg group-hover:scale-105 transition-transform duration-500'
                          : 'w-full h-full object-fill group-hover:scale-105 transition-transform duration-500'
                      }
                    />
                  </div>

                  {/* Body Content */}
                  <CardContent className="p-5 flex flex-col grow justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-lg font-bold text-foreground group-hover:underline line-clamp-1">
                          {project.title}
                        </h3>
                        {project.startDate && (
                          <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 pt-0.5">
                            {new Date(project.startDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{project.role}</p>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary/80 text-foreground font-medium border border-border/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/40">
                      {project.githubLink ? (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-foreground py-2 px-3 rounded-xl text-xs font-semibold transition-colors border border-border/40"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5 bg-muted text-muted-foreground py-2 px-3 rounded-xl text-xs font-semibold cursor-not-allowed border border-border/30">
                          <Github className="w-3.5 h-3.5" />
                          <span>Private</span>
                        </div>
                      )}

                      {hasLiveDemo ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-foreground text-background hover:bg-foreground/90 py-2 px-3 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                        >
                          {isSimulator ? (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Get Installer</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </>
                          )}
                        </a>
                      ) : (
                        <div
                          aria-disabled="true"
                          className="flex items-center justify-center gap-1.5 bg-secondary/50 text-muted-foreground/50 py-2 px-3 rounded-xl text-xs font-semibold cursor-not-allowed border border-border/40 select-none opacity-60"
                          title="No live demo available for this project"
                        >
                          <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                          <span>Live Demo</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
