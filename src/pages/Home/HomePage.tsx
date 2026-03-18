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

const Typewriter = ({ texts, speed = 100, waitTime = 2000 }: { texts: string[], speed?: number, waitTime?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentText = texts[index];

    // Handle switching modes
    if (!isDeleting && displayText === currentText) {
      timer = setTimeout(() => setIsDeleting(true), waitTime);
    } else if (isDeleting && displayText === '') {
      // Use setTimeout to avoid synchronous setState in effect body
      timer = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 0);
    } else {
      // Typing or Deleting logic
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
    <span className="text-primary font-bold">
      {displayText}
      <span className="animate-pulse ml-0.5 border-r-2 border-primary h-8 inline-block align-middle" />
    </span>
  );
};

export default function HomePage() {
  usePageTitle('Home');
  const location = useLocation();

  const { name, avatars, cvDownloadUrl, roles } = portfolioService.getRawData();

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mt-8 mb-6">
              <span className="text-foreground">Hi, I am </span>
              <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                {name}
              </span>
            </h1>
          </motion.div>

          {/* Typewriter Effect */}
          <div className="flex flex-wrap items-center justify-center gap-x-1 text-2xl md:text-3xl lg:text-3xl text-muted-foreground font-medium h-18">
             <span>I'm a </span>
             <Typewriter texts={roles} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-12 flex-wrap justify-center w-full px-4 sm:px-0">
            <Button 
              size="lg" 
              className="shadow-xl shadow-primary/20 text-lg py-7 px-10 rounded-full w-full sm:w-auto hover:scale-105 transition-all"
              onClick={() => scrollToSection('skills')}
            >
              View my Skills
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleDownloadCV} 
              className="text-lg py-7 px-10 rounded-full border-2 hover:bg-primary/5 w-full sm:w-auto hover:scale-105 transition-all"
            >
              Download CV
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
