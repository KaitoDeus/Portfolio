import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import Section from '@/components/common/Section';

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
  const { projects } = portfolioData;
  const { t } = useLanguage();

  return (
    <Section id="projects" title={t('projects.title')}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
          >
            <Card className="group overflow-hidden hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all cursor-pointer relative h-full flex flex-col">
              <ExternalLink className="absolute top-4 right-4 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors z-10 bg-background/50 rounded-full p-0.5" />
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="overflow-hidden rounded-lg mb-4">
                    <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-3 flex-grow">{project.role}</p>
                <div className="flex justify-between items-center mt-auto">
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                    {project.status === 'completed' ? t('projects.status.completed') : t('projects.status.inProgress')}
                    </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
