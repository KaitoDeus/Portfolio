import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProjects } from '@/hooks/useProjects';
import Section from '@/components/common/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, loading } = useProjects();
  const { t } = useLanguage();

  const project = projects.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <Section id="project-not-found" title={t('projects.notfound.title')}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-xl text-muted-foreground mb-6">{t('projects.notfound.desc')}</p>
          <Button asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('projects.back')}
            </Link>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section id={`project-${project.id}`} title={project.title}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <Button variant="outline" asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('nav.projects')}
            </Link>
          </Button>
          
          <div className="flex gap-3">
            {project.githubLink && (
              <Button asChild variant="outline">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> {t('projects.btn.source')}
                </a>
              </Button>
            )}
            {project.link && (
              <Button asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> {t('projects.btn.demo')}
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-border">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full max-h-[400px] object-cover"
          />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
            {project.status === 'completed' ? t('projects.status.completed') : t('projects.status.inProgress')}
          </Badge>
          <span className="text-muted-foreground font-medium">{t(`role.${project.role}`)}</span>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-xl prose-img:shadow-md prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
          {project.readmeContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.readmeContent}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic">{t('projects.noDescription')}</p>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
