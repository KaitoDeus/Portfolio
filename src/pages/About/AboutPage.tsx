import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  Gamepad2, Code, Brain, 
  GraduationCap, Briefcase, Award, Target,
  MapPin, Calendar, Music, BookOpen, CircleDot 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import Section from '@/components/common/Section';
import { usePageTitle } from '@/hooks/usePageTitle';

const hobbyIcons: Record<string, React.ElementType> = {
  game: Gamepad2,
  code: Code,
  brain: Brain,
  music: Music,
  book: BookOpen,
  football: CircleDot,
};

export default function AboutPage() {
  const { personalInfo, avatars, hobbies, education, career, certificates } = portfolioData;
  const { t } = useLanguage();
  usePageTitle('nav.about');
  
  const targetRef = useRef(null);
  useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  return (
    <Section id="about" title={t('about.title')}>
      <div className="max-w-6xl mx-auto space-y-12" ref={targetRef}>
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
            className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover border-4 border-primary shadow-xl shadow-primary/20"
          />
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-4 text-primary">
              {t('about.tagline')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t('about.bio')
                .replace('{name}', personalInfo.fullname)
                .replace('{school}', t('about.uthSchool'))}
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge variant="outline" className="text-sm py-1 px-3">
                <GraduationCap className="w-4 h-4 mr-1" /> {t('about.infoTech')}
              </Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">
                <MapPin className="w-4 h-4 mr-1" /> {t('about.hcmCity')}
              </Badge>
            </div>
          </div>
        </motion.div>

        <Separator />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard delay={0.1}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calendar className="w-5 h-5" /> {t('about.personalInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <InfoRow label={t('about.fullname')} value={personalInfo.fullname} />
               <InfoRow label={t('about.dob')} value={personalInfo.dateOfBirth} />
               <InfoRow label={t('about.major')} value={t('about.infoTech')} />
               <InfoRow label={t('about.school')} value={t('about.uthSchool')} />
            </CardContent>
          </InfoCard>

          <InfoCard delay={0.2}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange">
                <Target className="w-5 h-5" /> {t('about.careerGoals')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                {[1, 2, 3].map(num => (
                  <li key={num} className="flex items-start gap-2">
                    <span className="text-orange">•</span>
                    <span>{t(`about.goal${num}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </InfoCard>

          <InfoCard delay={0.3}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Gamepad2 className="w-5 h-5" /> {t('about.hobbies')}
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
                      className="py-2 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {t(hobby.titleKey)}
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange">
                    <Award className="w-5 h-5" /> {t('about.certificates')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <img 
                          src={cert.image} 
                          alt={cert.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{cert.title}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(cert.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                          <Badge variant="secondary" className="mt-1 text-xs">{cert.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TimelineCard 
                    title={t('about.education')} 
                    icon={GraduationCap} 
                    items={education} 
                    t={t}
                    colorClass="text-primary"
                />
                <TimelineCard 
                    title={t('about.careerTimeline')} 
                    icon={Briefcase} 
                    items={career} 
                    t={t}
                    colorClass="text-orange"
                />
            </div>
        </div>
      </div>
    </Section>
  );
}

// Inner components
function InfoCard({ children, delay }: { children: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <Card className="h-full transition-all hover:border-primary/50">{children}</Card>
        </motion.div>
    );
}

function InfoRow({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <span className="text-muted-foreground text-sm">{label}</span>
            <p className="font-medium">{value}</p>
        </div>
    );
}

function TimelineCard({ title, icon: Icon, items, t, colorClass }: any) {
    return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colorClass}`}>
                <Icon className="w-5 h-5" /> {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {items.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className={`timeline-item ${colorClass.replace('text-', 'hover:border-')}`}
                  >
                    <Badge variant="secondary" className="mb-2">
                        {item.year || 'Now'}
                    </Badge>
                    <h4 className="font-semibold">{item.titleKey ? t(item.titleKey) : item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        {item.locationKey ? t(item.locationKey) : item.location}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
    )
}
