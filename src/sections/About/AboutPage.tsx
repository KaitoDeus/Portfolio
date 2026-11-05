'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Gamepad2,
  Code,
  Brain,
  GraduationCap,
  Briefcase,
  Award,
  Target,
  MapPin,
  Calendar,
  Music,
  BookOpen,
  CircleDot,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { portfolioService } from '@/core/services/PortfolioService';
import { ICertificate } from '@/core/models/PortfolioModels';
import Section from '@/components/common/Section';
import PageHeader from '@/components/common/PageHeader';
import { getImageSrc } from '@/shared/lib/utils';
import { TimelineCard } from './components/TimelineCard';
import { CertModal } from './components/CertModal';

const hobbyIcons: Record<string, React.ElementType> = {
  game: Gamepad2,
  code: Code,
  brain: Brain,
  music: Music,
  book: BookOpen,
  football: CircleDot,
};

export default function AboutPage() {
  const {
    personalInfo,
    careerGoals,
    avatars,
    hobbies,
    education,
    career,
    certificates,
    bio,
  } = portfolioService.getRawData();

  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<ICertificate | null>(null);
  const avatarSrc = getImageSrc(avatars.about);

  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto space-y-16" ref={targetRef}>
        
        {/* Page Header */}
        <PageHeader
          badge="About Me"
          title="Background, Education"
          highlight="& Career Timeline"
          description="A detailed overview of my academic foundation, software engineering internships, career goals, and verified credentials."
        />

        {/* Hero Bio Card */}
        <Card className="border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-xl p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="relative shrink-0">
              <img
                src={avatarSrc}
                alt="Profile"
                loading="eager"
                className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-2xl object-cover border-2 border-border/80 shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 rounded-2xl bg-foreground/10 blur-xl -z-10 scale-105" />
            </div>

            <div className="flex-1 text-center lg:text-left space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                &ldquo;Using technology to predict and build the future.&rdquo;
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify sm:text-left">
                {bio}
              </p>

              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2">
                <Badge variant="outline" className="text-xs sm:text-sm py-1 px-3 border-border/60 bg-secondary/40">
                  <GraduationCap className="w-4 h-4 mr-1.5 text-foreground" /> IT Senior @ UTH
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm py-1 px-3 border-border/60 bg-secondary/40">
                  <Briefcase className="w-4 h-4 mr-1.5 text-foreground" /> Intern @ FPT Software
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm py-1 px-3 border-border/60 bg-secondary/40">
                  <MapPin className="w-4 h-4 mr-1.5 text-foreground" /> Ho Chi Minh City
                </Badge>
              </div>

              <div className="pt-4 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button asChild size="sm" className="rounded-full bg-foreground text-background font-semibold px-6">
                  <Link href="/contact" className="flex items-center gap-1.5">
                    <span>Contact Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full font-semibold px-6">
                  <Link href="/projects" className="flex items-center gap-1.5">
                    <span>View Projects</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Personal Info */}
          <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md shadow-md hover:border-foreground/40 transition-all flex flex-col">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="flex items-center gap-2 text-foreground font-bold text-lg">
                <Calendar className="w-5 h-5" /> Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3.5 grow">
              <InfoRow label="Full Name" value={personalInfo.fullname} icon={Sparkles} />
              <InfoRow label="Date of Birth" value={personalInfo.dateOfBirth} icon={Calendar} />
              <InfoRow label="Gender" value={personalInfo.gender} icon={CircleDot} />
              <InfoRow label="Address" value={personalInfo.address} icon={MapPin} />
              {personalInfo.phone && <InfoRow label="Phone" value={personalInfo.phone} icon={Phone} />}
              {personalInfo.email && <InfoRow label="Email" value={personalInfo.email} icon={Mail} />}
            </CardContent>
          </Card>

          {/* Card 2: Career Goals */}
          <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md shadow-md hover:border-foreground/40 transition-all flex flex-col">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="flex items-center gap-2 text-foreground font-bold text-lg">
                <Target className="w-5 h-5" /> Career Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 grow text-muted-foreground text-sm">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Short-Term Goal
                </div>
                <p className="leading-relaxed text-foreground/90 pl-4 border-l-2 border-emerald-500/40 text-xs sm:text-sm">
                  {careerGoals?.shortTerm ||
                    'Secure a Software Developer (Intern / Fresher / Junior) position to apply practical full-stack experience and contribute to production-grade applications.'}
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Long-Term Goal
                </div>
                <p className="leading-relaxed text-foreground/90 pl-4 border-l-2 border-blue-500/40 text-xs sm:text-sm">
                  {careerGoals?.longTerm ||
                    'Advance into a Senior Full-Stack Engineer / Technical Lead, master scalable cloud architecture (AWS/Docker/CI/CD), and achieve international English credentials.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Interests & Hobbies */}
          <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md shadow-md hover:border-foreground/40 transition-all flex flex-col md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="flex items-center gap-2 text-foreground font-bold text-lg">
                <Gamepad2 className="w-5 h-5" /> Interests &amp; Passions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grow flex flex-col justify-between space-y-4">
              <p className="text-xs text-muted-foreground">
                Activities that recharge my creative energy and inspire problem-solving skills outside work.
              </p>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => {
                  const Icon = hobbyIcons[hobby.icon] || Code;
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1.5 text-xs font-semibold bg-secondary/80 border border-border/50 text-foreground hover:bg-foreground hover:text-background transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 mr-1.5" />
                      {hobby.title}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Career & Education Timelines */}
        <div className="space-y-12">
          {/* Career Timeline */}
          <TimelineCard
            title="Professional Experience"
            icon={Briefcase}
            items={career}
            colorClass="text-foreground"
          />

          {/* Education Timeline */}
          <TimelineCard
            title="Education &amp; Qualifications"
            icon={GraduationCap}
            items={education}
            colorClass="text-foreground"
          />

          {/* Certificates & Credentials */}
          <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-lg overflow-hidden">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="flex items-center justify-between gap-2 text-foreground font-bold text-xl">
                <div className="flex items-center gap-2.5">
                  <Award className="w-6 h-6" />
                  <span>Certificates &amp; Credentials</span>
                </div>
                <span className="text-xs font-normal text-muted-foreground">
                  Click to inspect full certificate
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((cert, index) => {
                  const certImgSrc = getImageSrc(cert.image);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/40 hover:bg-secondary/80 hover:border-foreground/30 transition-all cursor-pointer group/cert shadow-xs"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <div className="w-20 h-16 rounded-lg overflow-hidden bg-background/80 border border-border/40 group-hover/cert:border-foreground/50 transition-colors shrink-0 flex items-center justify-center p-1">
                        <img
                          src={certImgSrc}
                          alt={cert.title}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover/cert:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover/cert:underline transition-colors text-sm line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                          <span>Verified</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Certificate Preview Modal */}
      <CertModal
        selectedCert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </Section>
  );
}

function InfoRow({ 
  label, 
  value, 
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  icon?: React.ElementType; 
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />}
      <div className="min-w-0 flex-1">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
          {label}
        </span>
        <p className="font-semibold text-sm text-foreground truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
