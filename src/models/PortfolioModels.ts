export class SocialLink {
  constructor(
    public platform: string,
    public url: string,
    public label: string
  ) {}
}

export class PersonalInfo {
  constructor(
    public fullname: string,
    public dateOfBirth: string,
    public major: string,
    public school: string,
    public careerObjective: string = ""
  ) {}
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public image: string,
    public role: string,
    public link: string,
    public githubLink: string,
    public status: 'completed' | 'in-progress',
    public readmeContent?: string,
    public technologies: string[] = [],
    public startDate: string = ''
  ) {}
}

export class Skill {
  constructor(
    public name: string,
    public icon: string,
    public color: string,
    public category: 'core' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools',
    public level: 'Beginner' | 'Intermediate' | 'Advanced',
    public descriptionKey: string // Key for translation
  ) {}
}

export class Certificate {
  constructor(
    public title: string,
    public image: string,
    public rating: number,
    public status: string
  ) {}
}

export class Hobby {
  constructor(
    public icon: string,
    public titleKey: string
  ) {}
}

export class TimelineItem {
    constructor(
        public year: string,
        public titleKey: string | null, // Key for translation
        public title: string | null,    // Direct text
        public locationKey: string | null, // Key for translation
        public location: string | null,    // Direct text
    ) {}
}

export class PortfolioData {
  constructor(
    public name: string,
    public roles: string[],
    public tagline: string,
    public bio: string,
    public avatars: { hero: string; about: string; skills: string; contact: string },
    public socialLinks: SocialLink[],
    public personalInfo: PersonalInfo,
    public hobbies: Hobby[],
    public education: TimelineItem[],
    public career: TimelineItem[],
    public skills: Skill[],
    public certificates: Certificate[],
    public projects: Project[],
    public cvDownloadUrl: string
  ) {}
}
