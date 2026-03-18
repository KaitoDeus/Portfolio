import { IPortfolioData, IProject, ISkill } from '@/core/models/PortfolioModels';
import { portfolioData } from '@/core/data/portfolioData';

/**
 * PortfolioService - Singleton pattern for managing portfolio data.
 * Implements Repository-like access to the underlying data source.
 * Follows SOLID principles by decoupling data source from UI components.
 */
export class PortfolioService {
  private static instance: PortfolioService;
  private readonly data: IPortfolioData;

  private constructor() {
    this.data = portfolioData;
  }

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  public getProjects(): IProject[] {
    return this.data.projects;
  }

  public getProjectById(id: string): IProject | undefined {
    return this.data.projects.find(p => p.id === id);
  }

  public getSkills(): ISkill[] {
    return this.data.skills;
  }

  public getPersonalInfo() {
    return this.data.personalInfo;
  }

  public getSocialLinks() {
    return this.data.socialLinks;
  }

  public getEducation() {
    return this.data.education;
  }

  public getCareer() {
    return this.data.career;
  }

  public getHobbies() {
    return this.data.hobbies;
  }

  public getCertificates() {
    return this.data.certificates;
  }

  public getRawData(): IPortfolioData {
    return this.data;
  }
}

export const portfolioService = PortfolioService.getInstance();
