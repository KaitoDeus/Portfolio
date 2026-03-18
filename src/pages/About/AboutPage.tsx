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
import { portfolioService } from '@/core/services/PortfolioService';
import { ITimelineItem } from '@/core/models/PortfolioModels';
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
  const { personalInfo, avatars, hobbies, education, career, certificates } = portfolioService.getRawData();
  
  const targetRef = useRef(null);
  useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  return (
    <Section id="about" title="About Me">
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
              Using technology to change the world
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm {personalInfo.fullname}, an IT student at University of Transport Ho Chi Minh City. I'm passionate about game development and software engineering, always eager to learn new technologies to create innovative and useful products.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge variant="outline" className="text-sm py-1 px-3">
                <GraduationCap className="w-4 h-4 mr-1" /> Information Technology
              </Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">
                <MapPin className="w-4 h-4 mr-1" /> Hồ Chí Minh
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
                <Calendar className="w-5 h-5" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <InfoRow label="Full Name" value={personalInfo.fullname} />
               <InfoRow label="Date of Birth" value={personalInfo.dateOfBirth} />
               <InfoRow label="Major" value="Information Technology" />
               <InfoRow label="School" value={personalInfo.school} />
            </CardContent>
          </InfoCard>

          <InfoCard delay={0.2}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange">
                <Target className="w-5 h-5" /> Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-orange">•</span>
                  <span>Complete a Software Engineer internship at a tech company in 2026.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange">•</span>
                  <span>Develop problem-solving skills through real-world projects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange">•</span>
                  <span>Learn best practices and professional software development processes.</span>
                </li>
              </ul>
            </CardContent>
          </InfoCard>

          <InfoCard delay={0.3}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
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
                      className="py-2 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange">
                    <Award className="w-5 h-5" /> Certificates
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
                    colorClass="text-primary"
                />
                <TimelineCard 
                    title="Career Timeline" 
                    icon={Briefcase} 
                    items={career} 
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

function TimelineCard({ title, icon: Icon, items, colorClass }: { title: string, icon: React.ElementType, items: ITimelineItem[], colorClass: string }) {
    return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${colorClass}`}>
                <Icon className="w-6 h-6" /> {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-colors">
                       <GraduationCap className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </h4>
                    
                    {item.subtitle && (
                      <p className="text-muted-foreground text-sm font-medium">
                        {item.subtitle}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                      <span className="font-semibold">{item.year}</span>
                    </div>

                    {item.extra && (
                      <p className="text-sm font-medium text-foreground/80">
                        {item.extra}
                      </p>
                    )}

                    {item.details && item.details.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {item.details.map((detail: string, dIdx: number) => (
                          <li key={dIdx} className="text-sm text-muted-foreground flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
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
