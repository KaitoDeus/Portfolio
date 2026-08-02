import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Circle
} from 'lucide-react';
import { 
  SiCplusplus, SiHtml5, SiCss3, SiJavascript, 
  SiSpringboot, SiPython, SiUnity,
  SiReact, SiTypescript, SiGit,
  SiMysql, SiMongodb, SiDocker,
  SiVercel, SiRender, SiMarkdown,
  SiDotnet, SiSharp, SiThreedotjs, SiFastapi, SiGooglegemini, SiWix,
  SiPostgresql, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress
} from 'react-icons/si';
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import Section from '@/components/common/Section';
import { portfolioService } from '@/core/services/PortfolioService';
import { ISkill } from '@/core/models/PortfolioModels';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  java: FaJava,
  spring: SiSpringboot,
  react: SiReact,
  mysql: SiMysql,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss3,
  docker: SiDocker,
  sql: DiMsqlServer,
  mongodb: SiMongodb,
  git: SiGit,
  vercel: SiVercel,
  render: SiRender,
  cpp: SiCplusplus,
  python: SiPython,
  unity: SiUnity,
  markdown: SiMarkdown,
  csharp: SiSharp,
  dotnet: SiDotnet,
  threejs: SiThreedotjs,
  fastapi: SiFastapi,
  mediapipe: SiGooglegemini,
  wix: SiWix,
  postgresql: SiPostgresql,
  tailwindcss: SiTailwindcss,
  vite: SiVite,
  nodejs: SiNodedotjs, 
  express: SiExpress 
};

const TerminalContent = () => {
  const [typedLength, setTypedLength] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const command = 'nickname: kaitodeus';

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev < command.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowOutput(true);
          }, 300);
          return prev;
        }
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const typedText = command.slice(0, typedLength);

  return (
    <div className="p-6 space-y-4 font-mono text-xs md:text-sm h-[150px] text-foreground/90">
      <div className="flex gap-2 opacity-80">
        <span>$</span>
        <span className="font-semibold">
          {typedText}
          {!showOutput && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-4 bg-foreground ml-1 align-middle animate-pulse"
            />
          )}
        </span>
      </div>
      
      {showOutput && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 gap-1"
        >
          {[
            { label: 'OS', value: 'Microsoft Windows' },
            { label: 'Shell', value: 'bash / powershell' },
            { label: 'Editor', value: 'Visual Studio (Code)' },
            { label: 'Focus', value: 'Software Engineer' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -5 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex gap-4"
            >
              <span className="font-bold w-12 shrink-0 opacity-60">{item.label}</span>
              <span className="text-foreground font-medium">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const SkillItem = ({ skill }: { skill: ISkill }) => {
  const Icon = iconMap[skill.icon] || Code2;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="relative aspect-square rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer transition-all duration-300 hover:border-foreground/40 hover:bg-card/90 hover:shadow-xl overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)` 
        }}
      />

      <div className="relative z-10 shrink-0">
        <Icon 
          className="w-12 h-12 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2" 
          style={{ 
            color: skill.color
          }}
        />
      </div>

      <span className="relative z-10 text-xs font-bold tracking-wider text-center uppercase text-foreground/80 group-hover:text-foreground transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default function SkillsPage() {
  const allSkills = portfolioService.getSkills();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'devops', label: 'DevOps & Tools' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <Section id="skills">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Header & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-foreground">
                 Professional <span className="underline decoration-foreground/30 underline-offset-8">Skills</span>
              </h2>
              <p className="text-xl text-muted-foreground border-l-4 border-foreground/40 pl-4 py-1">
                 Technologies I use to bring ideas to life.
              </p>
           </div>

           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
             <Card className="bg-card/70 border-border/60 shadow-2xl overflow-hidden font-mono text-xs md:text-sm backdrop-blur-md">
               <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/60">
                 <div className="flex gap-1.5">
                   <Circle className="w-3 h-3 fill-red-500/80 text-red-500/80" />
                   <Circle className="w-3 h-3 fill-yellow-500/80 text-yellow-500/80" />
                   <Circle className="w-3 h-3 fill-green-500/80 text-green-500/80" />
                 </div>
                 <span className="ml-2 text-muted-foreground text-xs">~/stack/overview</span>
               </div>
               <TerminalContent />
             </Card>
           </motion.div>
        </div>

        {/* Section divider and main filter interface */}
        <div className="space-y-8 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-6">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 bg-card/60 border border-border/60 p-1.5 rounded-xl backdrop-blur-md shadow-sm">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    activeCategory === category.id
                      ? 'bg-foreground text-background shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Container */}
          <div className="w-full">
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map(skill => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

      </div>
    </Section>
  );
}
