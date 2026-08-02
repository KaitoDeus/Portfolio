import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '@/core/services/PortfolioService';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { useLocation } from 'react-router-dom';
import AboutPage from '../About/AboutPage';
import SkillsPage from '../Skills/SkillsPage';
import ProjectsPage from '../Projects/ProjectsPage';
import ContactPage from '../Contact/ContactPage';
import backgroundHero from '@/assets/img/avt/background-hero.gif';

const Typewriter = ({ texts, speed = 100, waitTime = 2000 }: { texts: string[], speed?: number, waitTime?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentText = texts[index];

    if (!isDeleting && displayText === currentText) {
      timer = setTimeout(() => setIsDeleting(true), waitTime);
    } else if (isDeleting && displayText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 0);
    } else {
      timer = setTimeout(() => {
        setDisplayText(prev => 
          isDeleting 
            ? currentText.substring(0, prev.length - 1)
            : currentText.substring(0, prev.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed, waitTime]);

  return (
    <span className="text-foreground font-bold border-b-2 border-foreground/30 pb-0.5">
      {displayText}
      <span className="animate-pulse ml-0.5 border-r-2 border-foreground h-8 inline-block align-middle" />
    </span>
  );
};

export default function HomePage() {
  usePageTitle('Portfolio');
  const location = useLocation();

  const { name, roles } = portfolioService.getRawData();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]">
          <img 
            src={backgroundHero} 
            alt="Background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-25 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/70 via-transparent to-background" />
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-foreground/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none z-1" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-foreground/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none z-1" />

        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mt-4 mb-6">
              <span className="text-muted-foreground font-normal">Hi, I am </span>
              <span className="text-foreground underline decoration-foreground/30 underline-offset-8">
                {name}
              </span>
            </h1>
          </motion.div>

          {/* Typewriter Effect */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 text-2xl md:text-3xl lg:text-3xl text-muted-foreground font-medium h-18">
             <span>I'm a </span>
             <Typewriter texts={roles} />
          </div>

          <motion.p 
            className="mt-4 text-muted-foreground italic text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            "The best way to predict the future is to create it."
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-12 flex-wrap justify-center w-full px-4 sm:px-0">
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/80 font-bold text-base py-6 px-10 rounded-full w-full sm:w-auto hover:scale-105 transition-all shadow-xl"
              onClick={() => scrollToSection('skills')}
            >
              View my Skills
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
          <div className="w-6 h-10 border-2 border-border/60 rounded-full flex justify-center p-1 backdrop-blur-sm">
            <motion.div 
              className="w-1.5 h-1.5 bg-foreground rounded-full"
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
