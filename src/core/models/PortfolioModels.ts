export interface ISocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface IPersonalInfo {
  fullname: string;
  dateOfBirth: string;
  major: string;
  school: string;
  careerObjective: string;
}

export interface IProject {
  id: string;
  title: string;
  image: string;
  role: string;
  link: string;
  githubLink: string;
  status: 'completed' | 'in-progress';
  technologies: string[];
  startDate: string;
  category: 'personal' | 'school';
}

export interface ISkill {
  name: string;
  icon: string;
  color: string;
  category: 'core' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface ICertificate {
  title: string;
  image: string;
  rating: number;
  status: string;
}

export interface IHobby {
  icon: string;
  title: string;
}

export interface ITimelineItem {
  year: string;
  title: string | null;
  location: string | null;
  subtitle?: string | null;
  extra?: string | null;
  logo?: string;
  details?: string[];
}

export interface IPortfolioData {
  name: string;
  roles: string[];
  tagline: string;
  bio: string;
  avatars: { hero: string; about: string; skills: string; contact: string };
  socialLinks: ISocialLink[];
  personalInfo: IPersonalInfo;
  hobbies: IHobby[];
  education: ITimelineItem[];
  career: ITimelineItem[];
  skills: ISkill[];
  certificates: ICertificate[];
  projects: IProject[];
  cvDownloadUrl: string;
}
