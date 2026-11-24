'use client';

import { useState } from 'react';
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
  ArrowRight,
  ExternalLink,
  Sparkles,
  ZoomIn,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { portfolioService } from '@/core/services/PortfolioService';
import { ICertificate } from '@/core/models/PortfolioModels';
import { getImageSrc, cn } from '@/shared/lib/utils';
import { TimelineCard } from './components/TimelineCard';
import { CertModal } from './components/CertModal';
import { usePortfolio3D } from '@/shared/context/Portfolio3DContext';

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

  const { navigateTo } = usePortfolio3D();
  const [selectedCert, setSelectedCert] = useState<ICertificate | null>(null);
  const [timelineTab, setTimelineTab] = useState<'career' | 'education'>('career');
  const avatarSrc = getImageSrc(avatars.about);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <section id="about" className="w-full max-w-[1520px] mx-auto flex flex-col gap-5 relative z-10">
      {/* Compact Horizontal Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            About Me
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            &ldquo;Using technology to predict and build the future.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild size="sm" className="rounded-full bg-foreground text-background font-semibold px-5 h-9">
            <Link
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
              className="flex items-center gap-1.5"
            >
              <span>Contact Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-full font-semibold px-5 h-9">
            <Link
              href="/projects"
              onClick={(e) => handleNavClick(e, '/projects')}
              className="flex items-center gap-1.5"
            >
              <span>View Projects</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Horizontal 3-Column Widescreen Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[calc(100vh-13rem)] lg:max-h-[700px]">
        {/* Column 1: Profile, Bio, Personal Info & Hobbies */}
        <Card className="lg:col-span-4 border-border/60 bg-card/65 backdrop-blur-xl shadow-lg flex flex-col overflow-hidden py-0 gap-0">
          <div className="p-5 overflow-y-auto space-y-4 grow">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedCert({
                    title: personalInfo.fullname,
                    image: avatarSrc,
                    rating: 1,
                    status: '',
                  })
                }
                aria-label="View full size avatar"
                title="Click to enlarge photo"
                className="relative shrink-0 group/avatar rounded-2xl overflow-hidden border-2 border-border/80 hover:border-foreground/50 shadow-md transition-all cursor-pointer bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <img
                  src={avatarSrc}
                  alt={personalInfo.fullname}
                  loading="eager"
                  decoding="sync"
                  className="w-24 h-24 object-cover object-top transition-transform duration-300 group-hover/avatar:scale-105"
                />
                <span className="absolute inset-0 bg-black/0 group-hover/avatar:bg-black/25 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity drop-shadow-md" />
                </span>
              </button>
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-foreground truncate">
                  {personalInfo.fullname}
                </h2>
                <p className="text-xs text-muted-foreground font-medium">
                  {personalInfo.careerObjective || 'Software & Game Developer'}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{personalInfo.address}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
              {bio}
            </p>

            {/* Compact Personal Metadata Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-border/40">
              <InfoRow label="Date of Birth" value={personalInfo.dateOfBirth} icon={Calendar} />
              <InfoRow label="Gender" value={personalInfo.gender} icon={CircleDot} />
              <InfoRow label="Focus" value="Fullstack & Unity 3D" icon={Sparkles} />
              <InfoRow label="Location" value="Ho Chi Minh City" icon={MapPin} />
            </div>

            {/* Hobbies Strip */}
            <div className="pt-2 border-t border-border/40 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                Interests &amp; Passions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {hobbies.map((hobby, index) => {
                  const Icon = hobbyIcons[hobby.icon] || Code;
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-2.5 py-1 text-[11px] font-semibold bg-secondary/80 border border-border/50 text-foreground"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {hobby.title}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* Column 2: Interactive Experience / Education Switcher */}
        <Card className="lg:col-span-4 border-border/60 bg-card/65 backdrop-blur-xl shadow-lg flex flex-col overflow-hidden py-0 gap-0">
          <CardHeader className="px-5 py-3.5 border-b border-border/40 shrink-0 flex flex-row items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-foreground font-bold text-base">
              {timelineTab === 'career' ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
              <span>Journey</span>
            </CardTitle>

            <div className="flex items-center p-0.5 rounded-full bg-secondary/80 border border-border/50 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setTimelineTab('career')}
                className={cn(
                  'px-3 py-1 rounded-full transition-all cursor-pointer',
                  timelineTab === 'career'
                    ? 'bg-foreground text-background shadow-xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Work ({career.length})
              </button>
              <button
                type="button"
                onClick={() => setTimelineTab('education')}
                className={cn(
                  'px-3 py-1 rounded-full transition-all cursor-pointer',
                  timelineTab === 'education'
                    ? 'bg-foreground text-background shadow-xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Edu ({education.length})
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-5 overflow-y-auto grow">
            {timelineTab === 'career' ? (
              <TimelineCard
                title="Professional Experience"
                icon={Briefcase}
                items={career}
                colorClass="text-foreground"
                embedded
              />
            ) : (
              <TimelineCard
                title="Education"
                icon={GraduationCap}
                items={education}
                colorClass="text-foreground"
                embedded
              />
            )}
          </CardContent>
        </Card>

        {/* Column 3: Career Objectives + Verified Certificates */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:h-full min-h-0">
          {/* Top Card: Career Objectives */}
          <Card className="border-border/60 bg-card/65 backdrop-blur-xl shadow-lg shrink-0 py-0 gap-0">
            <CardHeader className="px-5 py-3 border-b border-border/40">
              <CardTitle className="flex items-center gap-2 text-foreground font-bold text-base">
                <Target className="w-4 h-4" /> Career Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-foreground font-bold text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Short-Term Goal
                </div>
                <p className="leading-relaxed text-foreground/85 pl-3 border-l-2 border-emerald-500/40">
                  {careerGoals?.shortTerm ||
                    'Secure a Software Developer position to apply practical full-stack experience and contribute to production applications.'}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-foreground font-bold text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Long-Term Goal
                </div>
                <p className="leading-relaxed text-foreground/85 pl-3 border-l-2 border-blue-500/40">
                  {careerGoals?.longTerm ||
                    'Advance into a Senior Full-Stack Engineer / Technical Lead and master scalable cloud architectures.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Card: Certificates & Credentials */}
          <Card className="border-border/60 bg-card/65 backdrop-blur-xl shadow-lg flex flex-col grow min-h-0 overflow-hidden py-0 gap-0">
            <CardHeader className="px-5 py-3 border-b border-border/40 shrink-0">
              <CardTitle className="flex items-center justify-between text-foreground font-bold text-base">
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Certificates</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {certificates.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 overflow-y-auto grow space-y-2.5">
              {certificates.map((cert, index) => {
                const certImgSrc = getImageSrc(cert.image);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40 border border-border/40 hover:bg-secondary/80 hover:border-foreground/30 transition-all cursor-pointer group/cert"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="w-14 h-11 rounded-lg overflow-hidden bg-background/80 border border-border/40 shrink-0 flex items-center justify-center p-0.5">
                      <img
                        src={certImgSrc}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover/cert:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover/cert:underline text-xs line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <span>Verified Credential</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <CertModal selectedCert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-2 p-2 rounded-lg bg-secondary/35 border border-border/30">
      {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />}
      <div className="min-w-0 flex-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
          {label}
        </span>
        <p className="font-semibold text-xs text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
