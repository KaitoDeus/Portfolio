import { useState, useEffect, useMemo } from 'react';
import { Linkedin, Github, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';

const socialIcons: any = {
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
};

// ... (Quotes constants)
const quotesVi = [
  "Đừng sợ thất bại, hãy sợ việc không bao giờ thử.",
  "Mọi chuyên gia đều từng là một người mới bắt đầu.",
  "Hành trình vạn dặm bắt đầu từ một bước chân.",
  "Đơn giản là đỉnh cao của sự tinh tế.",
  "Học không bao giờ làm kiệt sức tâm trí.",
  "Cách duy nhất để làm việc xuất sắc là yêu những gì bạn làm.",
  "Trước tiên, giải quyết vấn đề. Sau đó, viết code.",
  "Làm cho nó chạy, làm cho nó đúng, làm cho nó nhanh.",
  "Sự kiên nhẫn là chìa khóa của mọi thành công.",
  "Mỗi ngày là một cơ hội mới để học hỏi.",
  "Thất bại là mẹ thành công.",
  "Không có con đường tắt đến bất kỳ nơi nào đáng để đến.",
];

const quotesEn = [
  "Don't fear failure, fear not trying at all.",
  "Every expert was once a beginner.",
  "A journey of a thousand miles begins with a single step.",
  "Simplicity is the ultimate sophistication.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do.",
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "Patience is the key to success.",
  "Every day is a new opportunity to learn.",
  "Failure is the mother of success.",
  "There are no shortcuts to any place worth going.",
];

export default function HomePage() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { language, t } = useLanguage();
  usePageTitle('nav.home');

  const { name, avatars, socialLinks, cvDownloadUrl } = portfolioData;
  const currentRole = t('hero.role');

  const quoteIndex = useMemo(() => Math.floor(Math.random() * quotesVi.length), []);
  const randomQuote = language === 'vi' ? quotesVi[quoteIndex] : quotesEn[quoteIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setDisplayText('');
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

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
        
        <h3 className="text-2xl md:text-3xl mt-4 mb-4 font-light">
          {t('hero.greeting')} <span className="text-orange font-normal">{displayText}</span>
          <span className="inline-block w-0.5 h-7 bg-orange ml-1 animate-pulse" />
          {' '}{t('hero.from')}
        </h3>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed italic">"{randomQuote}"</p>

        <div className="flex gap-4 mt-8">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

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
