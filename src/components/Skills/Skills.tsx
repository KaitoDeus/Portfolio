import { motion } from 'framer-motion';
import { Zap, Terminal } from 'lucide-react';
import { 
  SiCplusplus, SiHtml5, SiCss3, SiJavascript, 
  SiSpringboot, SiPython, SiUnity,
  SiReact, SiTypescript, SiTailwindcss, SiGit,
  SiMysql, SiMongodb, SiDocker, SiDotnet,
  SiVercel, SiRender, SiMarkdown
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '../../context/LanguageContext';

// All skills in a single flat list for continuous display
const allSkills = [
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'C#', icon: SiUnity, color: '#68217A' },
  { name: 'Java', icon: FaJava, color: '#f89820' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'HTML5', icon: SiHtml5, color: '#e44d26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572b6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
  { name: '.NET', icon: SiDotnet, color: '#512BD4' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'SQL Server', icon: TbSql, color: '#CC2927' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Render', icon: SiRender, color: '#46E3B7' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Markdown', icon: SiMarkdown, color: '#000000' },
];

export default function Skills() {
  const { t } = useLanguage();

  const highlights = [
    t('skills.highlight1'),
    t('skills.highlight2'),
    t('skills.highlight3'),
    t('skills.highlight4'),
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-[5%] bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Terminal decoration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/80 backdrop-blur border-primary/20 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm text-muted-foreground flex items-center gap-1">
                  <Terminal className="w-4 h-4" /> terminal — bash
                </span>
              </div>
              
              <CardContent className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <p><span className="text-green-400">$</span> <span className="text-muted-foreground">whoami</span></p>
                  <p className="text-primary">{t('skills.terminal.whoami')}</p>
                  <p className="mt-4"><span className="text-green-400">$</span> <span className="text-muted-foreground">cat skills.txt</span></p>
                  <p className="text-orange">{t('skills.terminal.motto')}</p>
                  <p className="mt-4"><span className="text-green-400">$</span> <span className="text-primary animate-pulse">_</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Floating decorations */}
            <div className="hidden lg:block relative h-32 mt-8">
              <motion.div 
                className="absolute w-8 h-8 border-2 border-primary rounded rotate-45"
                animate={{ y: [0, -10, 0], rotate: [45, 50, 45] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ left: '20%' }}
              />
              <motion.div 
                className="absolute w-6 h-6 bg-orange/30 rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ left: '50%', top: '20px' }}
              />
              <motion.div 
                className="absolute w-10 h-10 border-2 border-primary/50 rounded-lg"
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ left: '75%' }}
              />
            </div>
          </motion.div>

          {/* Right side - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-2">{t('skills.title')}</h2>
            <p className="text-muted-foreground mb-8 uppercase tracking-wider text-sm">
              {t('skills.tagline')}
            </p>

            {/* Skill badges */}
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {allSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <Badge 
                    key={skill.name}
                    variant="outline"
                    className="py-2 px-3 text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-default group"
                  >
                    <Icon 
                      className="w-4 h-4 mr-2 group-hover:text-primary-foreground transition-colors" 
                      style={{ color: skill.color }}
                    />
                    {skill.name}
                  </Badge>
                );
              })}
            </motion.div>

            {/* Highlights */}
            <div className="mt-8 space-y-2">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Zap className="w-4 h-4 text-orange" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
