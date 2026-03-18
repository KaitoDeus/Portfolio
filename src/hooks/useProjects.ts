import { useState, useEffect } from 'react';
import { Project } from '../models/PortfolioModels';
import { portfolioData } from '../data/portfolioData';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetching
    const fetchProjects = async () => {
      setLoading(true);
      try {
        setProjects(portfolioData.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading };
}
