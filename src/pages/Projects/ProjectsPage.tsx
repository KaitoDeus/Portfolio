import { useState, useMemo } from 'react';
import { Github, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Section from '@/components/common/Section';
import Pagination from '@/components/common/Pagination';
import { useProjects } from '@/shared/hooks/useProjects';
import { usePagination } from '@/shared/hooks/usePagination';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsPage() {
  const { projects, loading } = useProjects();
  
  const [sortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personal' | 'school' | 'unity'>('all');

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime());
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime());
    }

    return result;
  }, [projects, sortOrder, selectedCategory]);

  const ITEMS_PER_PAGE = 6;
  
  const { 
    currentData: paginatedProjects, 
    currentPage, 
    totalPages, 
    next, 
    prev, 
    jump,
    setCurrentPage
  } = usePagination(filteredAndSortedProjects, ITEMS_PER_PAGE);

  return (
    <Section id="projects" title="My Projects">
      {loading ? (
          <div className="flex justify-center items-center h-48">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
          </div>
      ) : (
        <>
          {/* Category Tabs */}
          <div className="flex justify-center mb-12 gap-2 flex-wrap px-4">
            {(['all', 'personal', 'school', 'unity'] as const).map(cat => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-foreground text-background shadow-md scale-105'
                    : 'bg-card/60 backdrop-blur-md text-muted-foreground border border-border/60 hover:text-foreground hover:bg-card/90'
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat === 'all' && 'All'}
                {cat === 'personal' && 'Personal Projects'}
                {cat === 'school' && 'School Projects'}
                {cat === 'unity' && 'Unity Developer'}
              </button>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${currentPage}-${selectedCategory}`} 
          >
            <AnimatePresence mode='popLayout'>
              {paginatedProjects.map((project, index) => (
                <motion.div
                  key={project.id + index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="h-full"
                >
                  <Card className="overflow-hidden border-border/60 bg-card/60 backdrop-blur-md text-card-foreground transition-all duration-300 hover:border-foreground/40 hover:shadow-xl relative h-full flex flex-col group">
                    <CardContent className="p-4 flex flex-col grow">
                      <div className="overflow-hidden rounded-lg mb-4 bg-secondary/30">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-foreground">{project.title}</h4>
                      <div className="flex flex-wrap gap-1.5 mb-4 grow content-start">
                        {project.technologies?.map(tech => (
                          <span key={tech} className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary/80 text-foreground font-medium border border-border/40">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        {project.githubLink ? (
                          <a 
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-foreground py-2 px-2 rounded-lg text-sm font-medium transition-colors border border-border/40"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 bg-muted text-muted-foreground py-2 px-2 rounded-lg text-sm font-medium cursor-not-allowed border border-border/30">
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </div>
                        )}
                        {project.link ? (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-foreground text-background hover:bg-foreground/90 py-2 px-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Demo</span>
                          </a>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 bg-muted text-muted-foreground py-2 px-2 rounded-lg text-sm font-medium cursor-not-allowed border border-border/30">
                            <Globe className="w-4 h-4" />
                            <span>Demo</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Pagination 
             currentPage={currentPage}
             totalPages={totalPages}
             onNext={next}
             onPrev={prev}
             onJump={jump}
          />
        </>
      )}
    </Section>
  );
}
