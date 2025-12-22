import { motion } from 'framer-motion';
import { 
  Gamepad2, Code, Brain, 
  GraduationCap, Briefcase, Award, Target,
  MapPin, Calendar, Music, BookOpen, CircleDot
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { portfolioData } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

const hobbyIcons: Record<string, React.ElementType> = {
  game: Gamepad2,
  code: Code,
  brain: Brain,
  music: Music,
  book: BookOpen,
  football: CircleDot,
};

export default function About() {
  const { personalInfo, avatars, hobbies, education, career, certificates } = portfolioData;
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen py-20 px-[5%]">
      <motion.h2 
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t('about.title')}
      </motion.h2>

      <div className="max-w-6xl mx-auto space-y-12">
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
          {/* Personal Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Calendar className="w-5 h-5" /> {t('about.personalInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-muted-foreground text-sm">{t('about.fullname')}</span>
                  <p className="font-medium">{personalInfo.fullname}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">{t('about.dob')}</span>
                  <p className="font-medium">{personalInfo.dateOfBirth}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">{t('about.major')}</span>
                  <p className="font-medium">{t('about.infoTech')}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">{t('about.school')}</span>
                  <p className="font-medium text-sm">{t('about.uthSchool')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Goals Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange">
                  <Target className="w-5 h-5" /> {t('about.careerGoals')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-orange">•</span>
                    <span>{t('about.goal1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange">•</span>
                    <span>{t('about.goal2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange">•</span>
                    <span>{t('about.goal3')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hobbies Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
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
            </Card>
          </motion.div>
        </div>

        {/* Certificates Section */}
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

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <GraduationCap className="w-5 h-5" /> {t('about.education')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {education.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex-1 min-w-[200px] p-4 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <Badge className="mb-2">{item.year} - {t('about.now')}</Badge>
                    <h4 className="font-semibold">{t(item.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{t(item.locationKey)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange">
                <Briefcase className="w-5 h-5" /> {t('about.careerTimeline')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {career.map((milestone, index) => (
                  <div 
                    key={index} 
                    className="flex-1 min-w-[200px] p-4 rounded-lg border border-border hover:border-orange transition-colors"
                  >
                    <Badge variant="secondary" className="mb-2">{milestone.year}</Badge>
                    <h4 className="font-semibold">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
