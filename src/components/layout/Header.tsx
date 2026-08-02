import { useState, useEffect } from 'react';
import { Home, User, Lightbulb, FolderKanban, Mail, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Lightbulb },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Default to dark (Pure Black)
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
      {/* 1. DESKTOP HEADER (Visible only on lg screens) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-10 py-6 hidden lg:flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Center: Nav Pill */}
          <nav className="flex items-center bg-card/80 backdrop-blur-2xl border border-border/40 p-1.5 rounded-full shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeSection === item.id 
                    ? "bg-foreground text-background font-semibold shadow-md scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme Switcher Button (Desktop) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-3 rounded-full bg-card/80 backdrop-blur-2xl border border-border/40 text-foreground hover:bg-foreground/10 transition-all duration-300 shadow-xl flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>
      </header>

      {/* 2. MOBILE & TABLET BOTTOM NAV (Hidden on lg screens) */}
      <nav className="fixed z-40 left-1/2 -translate-x-1/2 w-[92%] max-w-md lg:hidden bottom-6">
        <div className="bg-card/90 backdrop-blur-3xl border border-border/40 p-1.5 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center py-2.5 px-3 rounded-full transition-all duration-300 min-w-[50px]",
                  isActive ? "text-foreground font-bold" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-all", isActive && "scale-110 stroke-[2.5px]")} />
                <span className={cn("text-[9px] font-bold uppercase mt-1 hidden sm:block", isActive ? "opacity-100" : "opacity-0")}>
                  {item.label}
                </span>
                {isActive && <div className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full" />}
              </button>
            );
          })}

          {/* Theme Switcher Button (Mobile) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full text-foreground hover:bg-foreground/10 transition-all flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
