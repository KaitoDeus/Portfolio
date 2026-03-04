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
    <aside 
      className="fixed top-0 left-0 h-screen w-16 bg-background border-r border-border z-50 flex flex-col pt-8 pb-4"
    >
      <div className="flex items-center justify-center h-16 w-full mb-8">
        <img 
          src="/src/assets/img/favicon-32x32.png" 
          alt="Logo" 
          className="w-10 h-10 rounded-full border border-border shadow-sm"
        />
      </div>

      <nav className="flex-1 w-full px-2 flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center justify-center p-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105"
            )}
            title={t(item.key)} // Tooltip for accessibility
          >
            <item.icon className="w-6 h-6 shrink-0" />
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-4 px-2 w-full items-center">
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
  );
}
