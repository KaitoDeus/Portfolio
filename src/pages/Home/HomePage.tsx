import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { t } = useLanguage();
  usePageTitle('nav.home');

  const { name, avatars, cvDownloadUrl } = portfolioData;

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvDownloadUrl;
    const sanitizedName = name.replace(/\s+/g, '-');
    link.download = `${sanitizedName}-CV.pdf`;
    link.click();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-[5%] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div 
        className="flex flex-col items-center text-center max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={avatars.hero} 
          alt="Avatar" 
          className="w-56 h-56 rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
        />
        
        <h1 className="text-5xl md:text-6xl font-bold text-primary mt-6">{name}</h1>
        
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <Button asChild size="lg" className="shadow-lg shadow-primary/30 text-lg py-6 px-8 rounded-full">
            <Link to="/skills">{t('hero.viewSkills')}</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleDownloadCV} className="text-lg py-6 px-8 rounded-full border-2 hover:bg-primary/5">
            {t('hero.downloadCV')}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
