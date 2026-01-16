import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { name } = portfolioData;

  return (
    <footer className="py-6 text-center bg-gradient-to-r from-primary/90 via-primary to-primary/90 backdrop-blur-sm">
      <p className="text-primary-foreground text-base font-semibold">
        {t('footer.copyright')
          .replace('{name}', name)
          .replace('{year}', currentYear.toString())}
      </p>
      <p className="text-primary-foreground/80 text-sm mt-1">
        {t('about.infoTech')}
      </p>
    </footer>
  );
}
