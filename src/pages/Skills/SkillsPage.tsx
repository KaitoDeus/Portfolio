import { motion } from 'framer-motion';
import { 
  Server, Database, Layout, Wrench, Code2, 
  Circle
} from 'lucide-react';
import { 
  SiCplusplus, SiHtml5, SiCss3, SiJavascript, 
  SiSpringboot, SiPython, SiUnity,
  SiReact, SiTypescript, SiGit,
  SiMysql, SiMongodb, SiDocker,
  SiVercel, SiRender, SiMarkdown
} from 'react-icons/si';
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import Section from '@/components/common/Section';
import { portfolioService } from '@/core/services/PortfolioService';
import { ISkill } from '@/core/models/PortfolioModels';
import { cn } from '@/shared/lib/utils';

// Map icon strings to components
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
};

// Skill Card Component
const SkillCard = ({ skill }: { skill: ISkill }) => {
  const Icon = iconMap[skill.icon] || Code2;

  return (
    <Card className="h-full min-w-[200px] border-primary/20 bg-card/40 backdrop-blur-sm hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
          <Icon className="w-6 h-6" style={{ color: skill.color }} />
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="font-bold text-base truncate">{skill.name}</h4>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase border",
              skill.level === 'Advanced' && "border-green-500/50 text-green-500 bg-green-500/5",
              skill.level === 'Intermediate' && "border-blue-500/50 text-blue-500 bg-blue-500/5",
              skill.level === 'Beginner' && "border-yellow-500/50 text-yellow-500 bg-yellow-500/5",
            )}>
              {skill.level}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SkillsPage() {
  // Group skills by category
  const skillsByCategory = portfolioService.getSkills().reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, ISkill[]>);

  // Define category layout order and display info
  const categories = [
    { key: 'backend', icon: Server, title: 'Backend' },
    { key: 'frontend', icon: Layout, title: 'Frontend' },
    { key: 'database', icon: Database, title: 'Database' },
    { key: 'devops', icon: Wrench, title: 'DevOps & Tools' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Section id="skills">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Terminal Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
           <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                 My Skills
              </h2>
              <p className="text-xl text-muted-foreground border-l-4 border-primary pl-4">
                 Passionate developer who loves to explore every tech stack
              </p>
              

           </div>

           {/* Terminal Mockup - Build Process */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
             <Card className="bg-zinc-950 border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
               <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                 <div className="flex gap-1.5">
                   <Circle className="w-3 h-3 fill-red-500 text-red-500" />
                   <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                   <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                 </div>
                 <span className="ml-2 text-zinc-500">~/projects/portfolio-fullstack</span>
               </div>
               <div className="p-6 space-y-4 text-zinc-300">
                 <div>
                   <span className="text-green-500">➜</span> <span className="text-blue-400">repo</span> <span className="text-zinc-500">git status</span>
                   <div className="text-zinc-500 mt-1">On branch main<br/>Your branch is up to date with 'origin/main'</div>
                 </div>
                 
                 <div>
                   <span className="text-green-500">➜</span> <span className="text-blue-400">backend</span> <span className="text-yellow-400">./mvnw clean install</span>
                   <div className="mt-1">
                     <span className="text-green-500">[INFO]</span> Scanning for projects...<br/>
                     <span className="text-green-500">[INFO]</span> Building Portfolio Core 1.0.0<br/>
                     <span className="text-green-500">[INFO]</span> --------------------------------------------------<br/>
                     <span className="text-green-500">[INFO]</span> BUILD SUCCESS
                   </div>
                 </div>

                 <div>
                   <span className="text-green-500">➜</span> <span className="text-blue-400">frontend</span> <span className="text-yellow-400">npm run build</span>
                   <div className="mt-1">
                     <span className="text-blue-500">vite v5.0.0</span> building for production...<br/>
                     <span className="text-green-500">✓</span> 4 modules transformed.<br/>
                     <span className="text-zinc-500">dist/index.html   0.45 kB</span><br/>
                     <span className="text-zinc-500">dist/assets/index.js   145.23 kB</span>
                   </div>
                 </div>

                 <div>
                    <span className="text-green-500">➜</span> <span className="text-blue-400">deploy</span> <span className="text-zinc-100 animate-pulse">_</span>
                 </div>
               </div>
             </Card>
           </motion.div>
        </div>

        {/* Skills Layout */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((cat) => {
             const categorySkills = skillsByCategory[cat.key];
             if (!categorySkills?.length) return null;

             const CatIcon = cat.icon;

             return (
               <div key={cat.key} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CatIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{cat.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {categorySkills.map((skill: ISkill) => (
                      <motion.div 
                        key={skill.name} 
                        variants={item}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="flex-grow sm:flex-grow-0"
                      >
                        <SkillCard skill={skill} />
                      </motion.div>
                    ))}
                  </div>
               </div>
             );
          })}
        </motion.div>

      </div>
    </Section>
  );
}
