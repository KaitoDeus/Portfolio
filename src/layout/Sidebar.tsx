import { NavLink } from 'react-router-dom';
import { Moon, Sun, Home, User, Lightbulb, FolderKanban, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', key: 'nav.home', icon: Home },
  { path: '/about', key: 'nav.about', icon: User },
  { path: '/skills', key: 'nav.skills', icon: Lightbulb },
  { path: '/projects', key: 'nav.projects', icon: FolderKanban },
  { path: '/contact', key: 'nav.contact', icon: Mail },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-[60] flex gap-2 md:hidden bg-background/80 backdrop-blur-md border border-border p-1.5 rounded-full shadow-md">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full flex-shrink-0 w-10 h-10 text-xs font-black tracking-tighter text-primary"
          onClick={toggleLanguage}
          title={language === 'en' ? 'Tiếng Việt' : 'English'}
        >
          {language.toUpperCase()}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full flex-shrink-0 w-10 h-10"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      <aside 
        className="fixed bottom-0 md:top-0 left-0 w-full md:w-16 h-16 md:h-screen bg-background/95 backdrop-blur-lg border-t md:border-t-0 md:border-r border-border z-50 flex flex-row md:flex-col pt-0 md:pt-16 pb-0 md:pb-8 justify-center items-center"
      >
        <nav className="w-full h-full md:flex-1 md:w-full px-2 md:px-2 flex flex-row md:flex-col justify-around md:justify-start items-center gap-0 md:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center justify-center p-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 md:scale-110" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hover:scale-105"
              )}
              title={t(item.key)} // Tooltip for accessibility
            >
              <item.icon className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex flex-col gap-4 px-2 w-full items-center">
          {/* Language Toggle */}
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full flex-shrink-0 w-10 h-10 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Tiếng Việt' : 'English'}
          >
            <span className="text-xs font-black tracking-tighter text-primary">
              {language.toUpperCase()}
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full flex-shrink-0 w-10 h-10 shadow-md"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </aside>
    </>
  );
}
