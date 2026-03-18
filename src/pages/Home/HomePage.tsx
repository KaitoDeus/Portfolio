import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AboutPage from '../About/AboutPage';
import SkillsPage from '../Skills/SkillsPage';
import ProjectsPage from '../Projects/ProjectsPage';
import ContactPage from '../Contact/ContactPage';

export default function HomePage() {
  const { t } = useLanguage();
  usePageTitle('nav.home');
  const location = useLocation();

  const { name, avatars, cvDownloadUrl } = portfolioData;

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvDownloadUrl;
    const sanitizedName = name.replace(/\s+/g, '-');
    link.download = `${sanitizedName}-CV.pdf`;
    link.click();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-[5%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={avatars.hero} 
              alt="Avatar" 
              className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-background shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mt-8">
              <span className="text-foreground">{t('hero.hello')} </span>
              <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                {name}
              </span>
            </h1>
          </motion.div>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t('hero.greeting')} <span className="text-primary font-semibold">{t('hero.role')}</span> {t('hero.from')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 flex-wrap justify-center w-full px-4 sm:px-0">
            <Button 
              size="lg" 
              className="shadow-xl shadow-primary/20 text-lg py-7 px-10 rounded-full w-full sm:w-auto hover:scale-105 transition-all"
              onClick={() => scrollToSection('skills')}
            >
              {t('hero.viewSkills')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleDownloadCV} 
              className="text-lg py-7 px-10 rounded-full border-2 hover:bg-primary/5 w-full sm:w-auto hover:scale-105 transition-all"
            >
              {t('hero.downloadCV')}
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <AboutPage />
      <SkillsPage />
      <ProjectsPage />
      <ContactPage />
    </div>
  );
}
