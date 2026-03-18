import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Globe } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personal' | 'school'>('all');

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime());
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime());
    }

    return result;
  }, [projects, sortOrder, selectedCategory]);

  // Set items per page (e.g. 6)
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
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
      ) : (
        <>
          {/* Category Tabs */}
          <div className="flex justify-center mb-12 gap-2">
            {(['all', 'personal', 'school'] as const).map(cat => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat === 'all' && 'All'}
                {cat === 'personal' && 'Personal Projects'}
                {cat === 'school' && 'School Projects'}
              </button>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // We use key here to force re-render/re-animation when page changes
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
                  <Card className="overflow-hidden border-border bg-card text-card-foreground transition-all relative h-full flex flex-col">
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <div className="overflow-hidden rounded-lg mb-4">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-52 object-fill"
                        />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                      <div className="flex flex-wrap gap-1.5 mb-4 flex-grow content-start">
                        {project.technologies?.map(tech => (
                          <span key={tech} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <Link 
                          to={`/projects/${project.id}`}
                          className="flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 px-2 rounded-md text-sm font-medium transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Details</span>
                        </Link>
                        {project.link ? (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-2 rounded-md text-sm font-medium transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Demo</span>
                          </a>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 bg-muted text-muted-foreground py-2 px-2 rounded-md text-sm font-medium cursor-not-allowed">
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
