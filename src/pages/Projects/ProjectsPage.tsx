import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Globe, Search, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import Section from '@/components/common/Section';
import Pagination from '@/components/common/Pagination';
import { useProjects } from '@/hooks/useProjects';
import { usePagination } from '@/hooks/usePagination';
import { usePageTitle } from '@/hooks/usePageTitle';

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
  const { t } = useLanguage();
  const { projects, loading } = useProjects();
  usePageTitle('nav.projects');
  
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'newest' | 'oldest'>('default');

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.technologies?.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, [projects]);

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Filter by tech
    if (selectedTechs.length > 0) {
      result = result.filter(p => 
        selectedTechs.some(tech => p.technologies?.includes(tech))
      );
    }

    // Filter by search
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.role.toLowerCase().includes(query) ||
        p.technologies?.some(t => t.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime());
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime());
    }

    return result;
  }, [projects, selectedTechs, searchQuery, sortOrder]);

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
    <Section id="projects" title={t('projects.title')}>
      {loading ? (
          <div className="flex justify-center items-center h-48">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
      ) : (
        <>
          {/* Search and Sort Bar */}
          <div className="max-w-6xl mx-auto w-full px-4 mb-10">
            <div className="bg-muted/30 dark:bg-muted/20 backdrop-blur-sm border border-border p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-all" 
                  placeholder={t('projects.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="flex items-center gap-2 min-w-[200px] w-full md:w-auto">
                <div className="bg-background/50 border border-border/50 rounded-md flex items-center px-3 py-2 w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-background transition-all">
                  <Calendar className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
                  <select 
                    className="w-full bg-transparent border-none text-sm focus:outline-none cursor-pointer text-foreground appearance-none"
                    value={sortOrder}
                    onChange={(e) => {
                      setSortOrder(e.target.value as any);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="default" className="bg-card text-card-foreground">{t('projects.sort.default')}</option>
                    <option value="newest" className="bg-card text-card-foreground">{t('projects.sort.newest')}</option>
                    <option value="oldest" className="bg-card text-card-foreground">{t('projects.sort.oldest')}</option>
                  </select>
                  <div className="pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-6xl mx-auto px-4">
            <Badge 
              variant={selectedTechs.length === 0 ? "default" : "outline"} 
              className="cursor-pointer text-sm px-3 py-1 transition-colors"
              onClick={() => {
                setSelectedTechs([]);
                setCurrentPage(1);
              }}
            >
              {t('projects.filter.all')}
            </Badge>
            {allTechs.map(tech => (
              <Badge 
                key={tech}
                variant={selectedTechs.includes(tech) ? "default" : "outline"}
                className="cursor-pointer text-sm px-3 py-1 transition-colors"
                onClick={() => toggleTech(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // We use key here to force re-render/re-animation when page changes
            key={`${currentPage}-${selectedTechs.join(',')}`} 
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
                          <span>{t('projects.btn.detail')}</span>
                        </Link>
                        {project.link ? (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-2 rounded-md text-sm font-medium transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            <span>{t('projects.btn.demo')}</span>
                          </a>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 bg-muted text-muted-foreground py-2 px-2 rounded-md text-sm font-medium cursor-not-allowed">
                            <Globe className="w-4 h-4" />
                            <span>{t('projects.btn.demo')}</span>
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
