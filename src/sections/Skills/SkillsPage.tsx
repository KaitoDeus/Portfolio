'use client';

import { useState, useEffect } from 'react';
import { 
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
import { getDeviconSvgUrl } from '@/shared/lib/devicon';

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

const getIconColor = (color: string) => {
  if (!color) return 'currentColor';
  const hex = color.toLowerCase().trim();
  if (hex === '#ffffff' || hex === '#000000' || hex === '#fff' || hex === '#000') {
    return 'currentColor';
  }
  return color;
};

const SkillIcon = ({ skill }: { skill: ISkill }) => {
  const [hasError, setHasError] = useState(false);
  const Icon = iconMap[skill.icon];
  const color = getIconColor(skill.color);
  const deviconUrl = getDeviconSvgUrl(skill.icon || skill.name);

  if (!hasError && deviconUrl) {
    return (
      <img
        src={deviconUrl}
        alt={skill.name}
        className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={() => setHasError(true)}
      />
    );
  }

  if (Icon) {
    return (
      <Icon
        className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
      style={{ color }}
    >
      {skill.name.slice(0, 2).toUpperCase()}
    </div>
  );
};

const TechMarquee = ({ skills }: { skills: ISkill[] }) => {
  const marqueeItems = [...skills, ...skills, ...skills];

  return (
    <div className="w-full overflow-hidden relative py-8 mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
      <div className="animate-marquee gap-6 items-center pt-8">
        {marqueeItems.map((skill, index) => {
          return (
            <div
              key={`${skill.name}-${index}`}
              className="relative group cursor-pointer shrink-0"
              title={skill.name}
            >
              {/* Tooltip Name Label on Hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap bg-foreground text-background text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg z-30 border border-border/40">
                {skill.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
              </div>

              {/* Icon Badge Circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card border border-border/70 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-foreground/50 text-foreground p-3.5 shadow-xs">
                <SkillIcon skill={skill} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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
          setShowOutput(true);
          return prev;
        }
      });
    }, 50);

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
            <span className="inline-block w-1.5 h-4 bg-foreground ml-1 align-middle animate-pulse" />
          )}
        </span>
      </div>
      
      {showOutput && (
        <div className="grid grid-cols-1 gap-1">
          {[
            { label: 'OS', value: 'Microsoft Windows' },
            { label: 'Shell', value: 'bash / powershell' },
            { label: 'Editor', value: 'Visual Studio (Code)' },
            { label: 'Focus', value: 'Software Engineer' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="font-bold w-12 shrink-0 opacity-60">{item.label}</span>
              <span className="text-foreground font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SkillsPage() {
  const allSkills = portfolioService.getSkills();

  return (
    <Section id="skills">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Header & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-foreground">
                 Professional <span>Skills</span>
              </h2>
              <p className="text-xl text-muted-foreground border-l-4 border-foreground/40 pl-4 py-1">
                 Technologies I use to bring ideas to life.
              </p>
           </div>

           <div>
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
           </div>
        </div>

        {/* Antigravity-Style Infinite Tech Icons Ribbon */}
        <TechMarquee skills={allSkills} />

      </div>
    </Section>
  );
}
