import { useState } from 'react';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'contact', key: 'nav.contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const activeSection = useActiveSection(navItems.map(item => item.id));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 w-full px-[7%] py-4 backdrop-blur-xl z-50 flex justify-between items-center border-b border-border/50 bg-white/40 dark:bg-black/40">
      <a 
        href="#home" 
        onClick={() => handleNavClick('home')}
        className="text-3xl font-extrabold text-primary hover:scale-110 transition-transform cursor-pointer"
      >
        KaitoDeus
      </a>

      <div 
        className="md:hidden text-primary text-3xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </div>

      <nav className={cn(
        "md:flex items-center gap-2",
        menuOpen 
          ? "absolute top-full right-0 w-[60%] p-6 bg-background/95 backdrop-blur-xl rounded-bl-2xl border-l border-b border-primary flex flex-col items-start gap-4"
          : "hidden"
      )}>
        {navItems.map(item => (
          <span
            key={item.id}
            className={cn(
              "text-lg font-medium cursor-pointer transition-all border-b-2 border-transparent hover:text-primary hover:border-primary px-2 py-1",
              activeSection === item.id && "text-primary border-primary"
            )}
            onClick={() => handleNavClick(item.id)}
          >
            {t(item.key)}
          </span>
        ))}

        {/* Language Toggle */}
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full ml-2 gap-1"
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          <Languages className="h-4 w-4" />
          {language === 'en' ? 'VI' : 'EN'}
        </Button>

        {/* Theme Toggle */}
        <Button 
          variant="default" 
          size="icon" 
          className="rounded-full"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </nav>
    </header>
  );
}
