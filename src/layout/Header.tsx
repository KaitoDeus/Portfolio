import { useState, useEffect } from 'react';
import { Home, User, Lightbulb, FolderKanban, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', key: 'nav.home', icon: Home },
  { id: 'about', key: 'nav.about', icon: User },
  { id: 'skills', key: 'nav.skills', icon: Lightbulb },
  { id: 'projects', key: 'nav.projects', icon: FolderKanban },
  { id: 'contact', key: 'nav.contact', icon: Mail },
];

export default function Header() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Active section tracking (only on home page)
      if (location.pathname === '/') {
        const sections = navItems.map(item => document.getElementById(item.id));
        const scrollPosition = currentScrollY + window.innerHeight / 3;

        sections.forEach(section => {
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              setActiveSection(section.id);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* 1. DESKTOP HEADER (Visible only on lg screens) - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 py-8 hidden lg:flex items-center justify-center pointer-events-none">
        {/* Center: Nav Pill (Desktop) */}
        <nav className="flex items-center bg-black/40 backdrop-blur-xl border border-white/5 p-1.5 rounded-full shadow-2xl pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeSection === item.id 
                  ? "bg-white/10 text-primary shadow-[0_0_15px_hsla(var(--primary)/0.3)] scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {t(item.key)}
            </button>
          ))}
        </nav>
      </header>

      {/* 2. MOBILE & TABLET BOTTOM NAV (Hidden on lg screens) - Fixed */}
      <nav className="fixed z-50 left-1/2 -translate-x-1/2 w-[92%] max-w-md lg:hidden bottom-8">
        <div className="bg-black/70 backdrop-blur-3xl border border-white/5 p-1.5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center py-2.5 px-3 rounded-full transition-all duration-300 min-w-[56px]",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-all", isActive && "scale-110 stroke-[2.5px]")} />
                <span className={cn("text-[9px] font-bold uppercase mt-1 hidden sm:block", isActive ? "opacity-100" : "opacity-0")}>
                  {t(item.key)}
                </span>
                {isActive && <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
