'use client';

import { useState, useRef } from 'react';
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
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { portfolioService } from '@/core/services/PortfolioService';
import { ICertificate } from '@/core/models/PortfolioModels';
import Section from '@/components/common/Section';
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

  const targetRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState<ICertificate | null>(null);

  const avatarSrc = getImageSrc(avatars.about);

  return (
    <Section id="about" title="About Me">
      <div className="max-w-6xl mx-auto space-y-12 relative" ref={targetRef}>
        {/* Hero Bio Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <img
            src={avatarSrc}
            alt="Profile"
            loading="lazy"
            decoding="async"
            className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover border-2 border-border/80 shadow-2xl"
          />
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Using technology to change the world
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-left">
              {bio}
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge variant="outline" className="text-sm py-1 px-3 border-border/60 bg-card/50 backdrop-blur-sm">
                <GraduationCap className="w-4 h-4 mr-1" /> Information Technology
              </Badge>
              <Badge variant="outline" className="text-sm py-1 px-3 border-border/60 bg-card/50 backdrop-blur-sm">
                <MapPin className="w-4 h-4 mr-1" /> Ho Chi Minh City
              </Badge>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                <Calendar className="w-5 h-5" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="Full Name" value={personalInfo.fullname} />
              <InfoRow label="Date of Birth" value={personalInfo.dateOfBirth} />
              <InfoRow label="Gender" value={personalInfo.gender} />
              <InfoRow label="Address" value={personalInfo.address} />
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                <Target className="w-5 h-5" /> Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold">Short-term:</span>
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    {careerGoals?.shortTerm ||
                      'Gain practical experience in full-stack development, contribute to real-world software projects, and learn from senior engineers to grow professionally as a Software Engineer.'}
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold">Long-term:</span>
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    {careerGoals?.longTerm ||
                      'Advance into a proficient Software Engineer / Technical Lead, master scalable cloud architecture, and obtain international English proficiency certificates (TOEIC/IELTS).'}
                  </span>
                </li>
              </ul>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                <Gamepad2 className="w-5 h-5" /> Interests & Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => {
                  const Icon = hobbyIcons[hobby.icon] || Code;
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3.5 py-1.5 text-xs font-semibold bg-secondary/50 border border-border/40 text-foreground hover:bg-secondary transition-colors"
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {hobby.title}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </InfoCard>
        </div>

        {/* Education, Career & Certificates */}
        <div className="space-y-8">
          {/* 1. Education (Full-width) */}
          <TimelineCard
            title="Education"
            icon={GraduationCap}
            items={education}
            colorClass="text-foreground"
          />

          {/* 2. Career Timeline (Full-width) */}
          <TimelineCard
            title="Career Timeline"
            icon={Briefcase}
            items={career}
            colorClass="text-foreground"
          />

          {/* 3. Certificates (Full-width) */}
          <Card className="border-border/60 bg-card/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                <Award className="w-5 h-5" /> Certificates &amp; Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((cert, index) => {
                  const certImgSrc = getImageSrc(cert.image);

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/40 hover:bg-secondary/70 transition-all cursor-pointer group/cert"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-background/80 border border-border/40 group-hover/cert:border-foreground/40 transition-colors shrink-0">
                        <img
                          src={certImgSrc}
                          alt={cert.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover/cert:underline transition-colors text-sm line-clamp-2">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertModal
        selectedCert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </Section>
  );
}

// Inner components
function InfoCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md transition-all hover:border-foreground/40">
        {children}
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground text-sm">{label}</span>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}
