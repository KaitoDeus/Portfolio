import { useState, useEffect } from 'react';
import { Project } from '../models/PortfolioModels';
import { portfolioData, projectsVi } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    // In a real application, this might be an API call
    // Here we're simulating data fetching for SOLID principles (DIP)
    const fetchProjects = async () => {
      setLoading(true);
      try {
        setProjects(language === 'vi' ? projectsVi : portfolioData.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  return { projects, loading };
}
