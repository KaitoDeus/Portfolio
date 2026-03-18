import { useState, useEffect } from 'react';
import { IProject } from '@/core/models/PortfolioModels';
import { portfolioService } from '@/core/services/PortfolioService';

export function useProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetching
    const fetchProjects = async () => {
      setLoading(true);
      try {
        setProjects(portfolioService.getProjects());
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
