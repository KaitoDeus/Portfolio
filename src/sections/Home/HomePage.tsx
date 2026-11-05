'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  FolderKanban, 
  User, 
  Mail, 
  ExternalLink, 
  Github, 
  Briefcase, 
  GraduationCap, 
  Gamepad2, 
  Code
} from 'lucide-react';
import { portfolioService } from '@/core/services/PortfolioService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getImageSrc } from '@/shared/lib/utils';
import { getDeviconSvgUrl } from '@/shared/lib/devicon';
import { ISkill } from '@/core/models/PortfolioModels';

const SkillMiniIcon = ({ skill }: { skill: ISkill }) => {
  const [hasError, setHasError] = useState(false);
  const deviconUrl = getDeviconSvgUrl(skill.icon || skill.name);

  if (!hasError && deviconUrl) {
    return (
      <img
        src={deviconUrl}
        alt={skill.name}
        loading="lazy"
        decoding="async"
        className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-foreground bg-secondary/80">
      {skill.name.slice(0, 2).toUpperCase()}
    </div>
  );
};

export default function HomePage() {
  const data = portfolioService.getRawData();
  const { name, skills, projects } = data;
  const featuredProjects = projects.slice(0, 3);
  const marqueeSkills = [...skills, ...skills];

  return (
    <div className="flex flex-col w-full space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="min-h-[65vh] sm:min-h-[72vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 relative">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[580px] h-[320px] sm:h-[420px] bg-foreground/[0.03] dark:bg-foreground/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 space-y-6 sm:space-y-8">
          
          {/* Main Typography Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight sm:leading-none">
              <span className="text-muted-foreground font-light">Hi, I am </span>
              <span className="text-foreground">{name}</span>
            </h1>

            {/* Tagline / Role */}
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium tracking-tight">
              I&apos;m a <span className="text-foreground font-bold">Software Developer</span>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center w-full max-w-xs sm:max-w-none pt-2 sm:pt-4">
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/80 font-bold text-base py-6 px-8 rounded-full shadow-xl hover:scale-105 transition-all"
            >
              <Link href="/projects" className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5" />
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold text-base py-6 px-8 rounded-full border-border/70 hover:bg-foreground/5 hover:border-foreground/40 transition-all"
            >
              <Link href="/about" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>About Me</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="font-bold text-base py-6 px-8 rounded-full bg-secondary/80 hover:bg-secondary transition-all"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
              </Link>
            </Button>
          </div>

        </div>
      </section>

      {/* 2. HIGHLIGHT METRICS (Bento Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all shadow-md group">
            <CardContent className="p-6 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Current Experience</p>
              <h2 className="text-lg font-bold text-foreground">FPT Software</h2>
              <p className="text-xs text-muted-foreground">Software Engineer Intern (Remote)</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all shadow-md group">
            <CardContent className="p-6 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Education</p>
              <h2 className="text-lg font-bold text-foreground">University of Transport</h2>
              <p className="text-xs text-muted-foreground">Senior IT Student (2023 - 2027)</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all shadow-md group">
            <CardContent className="p-6 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Specialization</p>
              <h2 className="text-lg font-bold text-foreground">Game &amp; Simulation</h2>
              <p className="text-xs text-muted-foreground">Unity, C#, Rigid Body Dynamics</p>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 transition-all shadow-md group">
            <CardContent className="p-6 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Full-Stack Web</p>
              <h2 className="text-lg font-bold text-foreground">Modern Web &amp; Mobile</h2>
              <p className="text-xs text-muted-foreground">Next.js 15, Spring Boot, Kotlin</p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* 3. FEATURED PROJECTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Handpicked applications highlighting 3D simulation, mobile architecture, and full-stack development.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-foreground hover:bg-secondary font-semibold shrink-0 group self-start sm:self-auto"
          >
            <Link href="/projects" className="flex items-center gap-1.5">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => {
            const imgSrc = getImageSrc(project.image);
            return (
              <Card
                key={project.id}
                className="p-0 gap-0 overflow-hidden border-border/60 bg-card/60 backdrop-blur-md hover:border-foreground/40 hover:shadow-xl transition-all duration-300 flex flex-col group h-full rounded-2xl"
              >
                <div className="h-48 overflow-hidden bg-secondary/30 relative border-b border-border/40">
                  <img
                    src={imgSrc}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-5 flex flex-col grow justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:underline">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-secondary/80 border border-border/40 text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground transition-colors border border-border/40"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live / Release</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. SKILLS MARQUEE PREVIEW */}
      <section className="w-full space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Core Skills &amp; Arsenal
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Proficient in game physics, full-stack frameworks, databases, and DevOps tools.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-foreground hover:bg-secondary font-semibold shrink-0 group self-start sm:self-auto"
          >
            <Link href="/skills" className="flex items-center gap-1.5">
              <span>Explore All Skills &amp; Specs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Infinite ribbon */}
        <div className="w-full overflow-hidden relative py-6 mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="animate-marquee gap-5 items-center">
            {marqueeSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border/60 shadow-xs shrink-0 group hover:scale-105 transition-all"
              >
                <SkillMiniIcon skill={skill} />
                <span className="text-sm font-bold text-foreground whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6">
        <Card className="border border-border/70 bg-gradient-to-br from-card/90 via-card/60 to-secondary/30 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden p-8 sm:p-12 text-center relative">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Let&apos;s build something extraordinary together.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Whether you have an internship opportunity, a project proposal, or want to discuss game development and web architectures, I&apos;d love to connect.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/80 font-bold px-8 py-6 rounded-full shadow-xl hover:scale-105 transition-all"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Reach Out &amp; Chat AI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-bold px-8 py-6 rounded-full border-border/80 hover:bg-foreground/5 transition-all"
              >
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
