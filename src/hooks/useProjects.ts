import { useState, useEffect } from 'react';
import { Project } from '../models/PortfolioModels';
import { portfolioData } from '../data/portfolioData';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this might be an API call
    // Here we're simulating data fetching for SOLID principles (DIP)
    const fetchProjects = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
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
