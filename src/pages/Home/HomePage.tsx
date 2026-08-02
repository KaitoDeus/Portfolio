import { useState, useEffect, lazy, Suspense } from 'react';
import { portfolioService } from '@/core/services/PortfolioService';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { useLocation } from 'react-router-dom';

const AboutPage = lazy(() => import('../About/AboutPage'));
const SkillsPage = lazy(() => import('../Skills/SkillsPage'));
const ProjectsPage = lazy(() => import('../Projects/ProjectsPage'));
const ContactPage = lazy(() => import('../Contact/ContactPage'));

const Typewriter = ({ texts, speed = 80, waitTime = 1800 }: { texts: string[], speed?: number, waitTime?: number }) => {
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
    <span className="text-foreground font-bold">
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
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
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
        <div className="flex flex-col items-center text-center max-w-4xl relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mt-4 mb-6">
              <span className="text-muted-foreground font-normal">Hi, I am </span>
              <span className="text-foreground">
                {name}
              </span>
            </h1>
          </div>

          {/* Typewriter Effect */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 text-2xl md:text-3xl lg:text-3xl text-muted-foreground font-medium h-18">
             <span>I'm a </span>
             <Typewriter texts={roles} />
          </div>

          <p className="mt-4 text-muted-foreground italic text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            "The best way to predict the future is to create it."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-12 flex-wrap justify-center w-full px-4 sm:px-0">
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/80 font-bold text-base py-6 px-10 rounded-full w-full sm:w-auto hover:scale-105 transition-all shadow-xl"
              onClick={() => scrollToSection('skills')}
            >
              View my Skills
            </Button>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <Suspense fallback={null}>
        <AboutPage />
        <SkillsPage />
        <ProjectsPage />
        <ContactPage />
      </Suspense>
    </div>
  );
}
