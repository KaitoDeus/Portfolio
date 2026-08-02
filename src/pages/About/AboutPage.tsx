import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { portfolioService } from '@/core/services/PortfolioService';
import { ITimelineItem, ICertificate } from '@/core/models/PortfolioModels';
import Section from '@/components/common/Section';

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
    avatars,
    hobbies,
    education,
    career,
    certificates,
    bio,
  } = portfolioService.getRawData();

  const targetRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState<ICertificate | null>(null);

  return (
    <Section id="about" title="About Me">
      <div className="max-w-6xl mx-auto space-y-12 relative" ref={targetRef}>
        {/* Hero Bio Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img
            src={avatars.about}
            alt="Profile"
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
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard delay={0.1}>
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

          <InfoCard delay={0.2}>
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
                    Gain experience in full-stack development, hone foundational
                    knowledge through real-world projects, and learn from
                    mentors to grow professionally.
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold">Long-term:</span>
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    Become a proficient C# programmer and obtain English
                    proficiency certificates (TOEIC/IELTS).
                  </span>
                </li>
              </ul>
            </CardContent>
          </InfoCard>

          <InfoCard delay={0.3}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                <Gamepad2 className="w-5 h-5" /> Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => {
                  const Icon = hobbyIcons[hobby.icon] || Code;
                  return (
                    <Badge
                      key={index}
                      variant="outline"
                      className="py-2 px-3 hover:bg-foreground hover:text-background transition-colors cursor-default border-border/60 bg-card/40 backdrop-blur-sm"
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

        {/* Certificates & Education */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border/60 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                  <Award className="w-5 h-5" /> Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/40 hover:bg-secondary/70 transition-all cursor-pointer group/cert"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-background/80 border border-border/40 group-hover/cert:border-foreground/40 transition-colors">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover/cert:underline transition-colors">{cert.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimelineCard
              title="Education"
              icon={GraduationCap}
              items={education}
              colorClass="text-foreground"
            />
            <TimelineCard
              title="Career Timeline"
              icon={Briefcase}
              items={career}
              colorClass="text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border/60 flex justify-between items-center">
                <h3 className="text-xl font-bold text-foreground">{selectedCert.title}</h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 bg-background/40">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// Inner components
function InfoCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md transition-all hover:border-foreground/40">
        {children}
      </Card>
    </motion.div>
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

function TimelineCard({
  title,
  icon: Icon,
  items,
  colorClass,
}: {
  title: string;
  icon: React.ElementType;
  items: ITimelineItem[];
  colorClass: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <Card className="h-full border-border/60 bg-card/60 backdrop-blur-md">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 font-bold ${colorClass}`}>
            <Icon className="w-6 h-6" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="shrink-0">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors overflow-hidden ${
                    item.logo
                      ? 'bg-transparent'
                      : 'bg-secondary/40 border border-border/40 group-hover:border-foreground/40'
                  }`}
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title || ''}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </div>
              </div>

              <div className="grow space-y-1">
                <h4 className="text-lg font-bold group-hover:text-foreground transition-colors leading-tight">
                  {item.title}
                </h4>

                {item.subtitle && (
                  <p className="text-muted-foreground text-sm font-medium">
                    {item.subtitle}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">{item.year}</span>
                </div>

                {item.extra && (
                  <p className="text-sm font-medium text-foreground/90 whitespace-pre-wrap">
                    {item.extra}
                  </p>
                )}

                {item.details && item.details.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {item.details.map((detail: string, dIdx: number) => (
                      <li
                        key={dIdx}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-foreground/50 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
