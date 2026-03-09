import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { Github, Linkedin, Facebook, Instagram } from 'lucide-react';

const socialIcons: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { name, socialLinks } = portfolioData;
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-6 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.platform.toLowerCase()] || Github;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                title={link.platform}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Tech Stack & Info */}
        <div className="text-center space-y-2">
          <p className="text-lg font-bold tracking-tight">
            {name} <span className="text-muted-foreground font-normal mx-2">|</span> © {currentYear}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('footer.builtWith')} <span className="text-primary font-medium">React</span> + 
            <span className="text-primary font-medium"> TypeScript</span> + 
            <span className="text-primary font-medium"> Tailwind CSS</span>
          </p>
        </div>

        {/* Subtle Decorative Element */}
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-orange rounded-full opacity-50"></div>
      </div>
    </footer>
  );
}
