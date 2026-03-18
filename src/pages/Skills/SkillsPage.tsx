import { motion } from 'framer-motion';
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
  SiPostgresql, SiTailwindcss, SiVite
} from 'react-icons/si';
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import Section from '@/components/common/Section';
import { portfolioService } from '@/core/services/PortfolioService';
import { ISkill } from '@/core/models/PortfolioModels';

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
  csharp: SiSharp,
  dotnet: SiDotnet,
  threejs: SiThreedotjs,
  fastapi: SiFastapi,
  mediapipe: SiGooglegemini,
  wix: SiWix,
  postgresql: SiPostgresql,
  tailwindcss: SiTailwindcss,
  vite: SiVite,
};

const SkillItem = ({ skill }: { skill: ISkill }) => {
  const Icon = iconMap[skill.icon] || Code2;
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-4 px-10 group cursor-default"
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative group">
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: skill.color }}
        />
        
        <Icon 
          className="w-16 h-16 transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100" 
          style={{ 
            color: 'currentColor' // Default color (usually gray due to opacity/grayscale)
          }}
          // We override color with inline style for the 'bright' state
          data-color={skill.color}
        />
        
        {/* We use a clever CSS trick: the icon is grayscale by default. 
            On hover, we set its color to the brand color and remove grayscale. */}
        <style dangerouslySetInnerHTML={{ __html: `
          .group:hover [data-color="${skill.color}"] {
            color: ${skill.color} !important;
          }
        `}} />
      </div>
      
      <span className="text-sm font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 text-muted-foreground group-hover:text-foreground">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default function SkillsPage() {
  const allSkills = portfolioService.getSkills();
  
  // Duplicating the list for smooth infinite scroll
  const repeatedSkills = [...allSkills, ...allSkills, ...allSkills];

  return (
    <Section id="skills">
      <div className="max-w-7xl mx-auto space-y-24 overflow-hidden">
        
        {/* Terminal Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
           <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter">
                 Professional <span className="text-primary">Skills</span>
              </h2>
              <p className="text-xl text-muted-foreground border-l-4 border-primary/50 pl-4 py-1">
                 Technologies I use to bring ideas to life.
              </p>
           </div>

           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
             <Card className="bg-zinc-950/80 border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs md:text-sm backdrop-blur-md">
               <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                 <div className="flex gap-1.5">
                   <Circle className="w-3 h-3 fill-red-500/80 text-red-500/80" />
                   <Circle className="w-3 h-3 fill-yellow-500/80 text-yellow-500/80" />
                   <Circle className="w-3 h-3 fill-green-500/80 text-green-500/80" />
                 </div>
                 <span className="ml-2 text-zinc-500">~/stack/overview</span>
               </div>
               <div className="p-6 space-y-4 text-zinc-400">
                  <div className="flex gap-2 text-zinc-500">
                    <span>$</span>
                    <span className="text-zinc-300">neofetch</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex gap-4"><span className="text-blue-400 font-bold">OS</span> <span>Windows 11 / Linux (WSL2)</span></div>
                    <div className="flex gap-4"><span className="text-blue-400 font-bold">Shell</span> <span>Zsh / PowerShell</span></div>
                    <div className="flex gap-4"><span className="text-blue-400 font-bold">Editor</span> <span>VS Code / IntelliJ IDEA</span></div>
                    <div className="flex gap-4"><span className="text-blue-400 font-bold">Focus</span> <span>Fullstack Development</span></div>
                  </div>
               </div>
             </Card>
           </motion.div>
        </div>

        {/* Infinite Scroll Ticker */}
        <div className="relative py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:after:from-background after:to-transparent">
          <motion.div 
            className="flex items-center min-w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {repeatedSkills.map((skill, index) => (
              <SkillItem key={`${skill.name}-${index}`} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* Secondary Ticker (Reverse Direction) */}
        <div className="relative py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:after:from-background after:to-transparent">
          <motion.div 
            className="flex items-center min-w-max"
            animate={{ x: ["-50%", 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
          >
            {repeatedSkills.slice().reverse().map((skill, index) => (
              <SkillItem key={`rev-${skill.name}-${index}`} skill={skill} />
            ))}
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
