import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function usePageTitle(pageKey: string) {
  const { t } = useLanguage();

  useEffect(() => {
    // pageKey would be something like 'nav.home', 'nav.about' etc.
    const pageTitle = t(pageKey);
    document.title = `${pageTitle} | Võ Anh Khải`;
  }, [pageKey, t]);
}
