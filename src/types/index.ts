// Portfolio Data Types

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'facebook' | 'instagram';
  url: string;
  label: string;
}

export interface PersonalInfo {
  fullname: string;
  dateOfBirth: string;
  major: string;
  school: string;
  careerObjective: string;
}

export interface Hobby {
  icon: string;
  titleKey: string;
}

export interface Education {
  year: string;
  titleKey: string;
  locationKey: string;
}

export interface CareerMilestone {
  year: string;
  title: string;
  location: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
  percentage: number;
}

export interface Certificate {
  image: string;
  title: string;
  rating: number;
  status: string;
}

export interface Project {
  image: string;
  title: string;
  role: string;
  link: string;
  status: 'completed' | 'in-progress';
}

export interface PortfolioData {
  name: string;
  roles: string[];
  tagline: string;
  bio: string;
  avatars: {
    hero: string;
    about: string;
    skills: string;
    contact: string;
  };
  socialLinks: SocialLink[];
  personalInfo: PersonalInfo;
  hobbies: Hobby[];
  education: Education[];
  career: CareerMilestone[];
  skills: Skill[];
  certificates: Certificate[];
  projects: Project[];
  cvDownloadUrl: string;
}
