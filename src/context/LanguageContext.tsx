import { createContext, useContext, ReactNode } from 'react';

// Use English as the only language
export type Language = 'en';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English Translations only
const translations: Record<string, string> = {
  // Navigation
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  
  // Hero
  'hero.hello': 'Hi, I am',
  'hero.greeting': "I'm a",
  'hero.role': 'Software Engineer',
  'hero.from': 'from Vietnam.',
  'hero.viewSkills': 'View my Skills',
  'hero.downloadCV': 'Download CV',
  
  // About
  'about.title': 'About Me',
  'about.tagline': 'Using technology to change the world',
  'about.bio': "I'm {name}, an IT student at {school}. I'm passionate about game development and software engineering, always eager to learn new technologies to create innovative and useful products.",
  'about.personalInfo': 'Personal Information',
  'about.fullname': 'Full Name',
  'about.dob': 'Date of Birth',
  'about.major': 'Major',
  'about.school': 'School',
  'about.careerGoals': 'Career Goals',
  'about.goal1': 'Complete a Software Engineer internship at a tech company in 2026.',
  'about.goal2': 'Develop problem-solving skills through real-world projects.',
  'about.goal3': 'Learn best practices and professional software development processes.',
  'about.hobbies': 'Hobbies',
  'about.certificates': 'Certificates',
  'about.education': 'Education',
  'about.careerTimeline': 'Career Timeline',
  'about.infoTech': 'Information Technology',
  'about.uthSchool': 'University of Transport Ho Chi Minh City',
  'about.hcmCity': 'Hồ Chí Minh',
  'about.vocationalSchool': 'Vocational College Ho Chi Minh City',
  'about.gpa.uth': 'GPA: 3.2/4',
  'about.ranking.goodMVP': 'Very Good',
  'about.now': 'now',
  
  // Hobbies
  'hobby.gaming': 'Gaming',
  'hobby.programming': 'Programming',
  'hobby.music': 'Classical Music',
  'hobby.reading': 'Reading',
  'hobby.football': 'Football',
  'hobby.learning': 'Learning new Tech',
  
  // Skills
  'skills.title': 'My Skills',
  'skills.tagline': 'Passionate developer who loves to explore every tech stack',
  'skills.terminal.whoami': 'software_engineer',
  'skills.terminal.motto': '"Build. Ship. Improve."',
  'skills.category.core': 'Core Fullstack Stack',
  'skills.category.frontend': 'Frontend',
  'skills.category.backend': 'Backend',
  'skills.category.database': 'Database',
  'skills.category.devops': 'DevOps & Tools',
  'skills.category.tools': 'Tools',
  
  // Skill Descriptions
  'skills.desc.java': 'OOP, Stream, Exception, JVM basics',
  'skills.desc.spring': 'REST API, Validation, Pagination',
  'skills.desc.react': 'Hooks, Redux, Component Lifecycle',
  'skills.desc.mysql': 'Indexing, Transaction, Query Optimization',
  'skills.desc.ts': 'Strong Typing, Interfaces, Generics',
  'skills.desc.js': 'ES6+, Async/Await, DOM Manipulation',
  'skills.desc.html': 'Semantic Structure, Accessibility',
  'skills.desc.css': 'Flexbox, Grid, Responsive Design',
  'skills.desc.security': 'JWT, Role-based Authorization',
  'skills.desc.jpa': 'Entity, Mapping, Query Optimization',
  'skills.desc.docker': 'Containerization (Backend focus)',
  'skills.desc.sqlserver': 'Stored Procedures, Triggers',
  'skills.desc.mongodb': 'NoSQL, Aggregation Framework',
  'skills.desc.git': 'Version Control, Branching Strategies',
  'skills.desc.vercel': 'Deployment, CI/CD Integration',
  'skills.desc.render': 'Cloud Hosting, Auto-deploy',
  'skills.desc.cpp': 'Data Structures, Algorithms',
  'skills.desc.python': 'Scripting, Automation',
  'skills.desc.unity': 'Game Logic, Physics, C# Scripting',
  'skills.desc.markdown': 'Documentation, READMEs',
  
  // Projects
  'projects.title': 'My Projects',
  'projects.status.completed': 'Completed',
  'projects.status.inProgress': 'In Progress',
  'projects.filter.all': 'All',
  'projects.category.personal': 'Personal Projects',
  'projects.category.school': 'School Projects',
  'projects.btn.detail': 'Details',
  'projects.btn.demo': 'Demo',
  'projects.btn.source': 'Source',
  'projects.btn.prevProject': 'Previous Project',
  'projects.btn.nextProject': 'Next Project',
  'projects.notfound.title': 'Project Not Found',
  'projects.notfound.desc': 'The project you are looking for does not exist.',
  'projects.back': 'Back to Projects',
  'projects.noDescription': 'No detailed description available for this project.',
  'projects.search.placeholder': 'Search projects...',
  'projects.sort.label': 'Sort by Timeline:',
  'projects.sort.default': 'Default',
  'projects.sort.newest': 'Newest First',
  'projects.sort.oldest': 'Oldest First',
  'role.Desktop Application': 'Desktop Application',
  'role.Dashboard Web Application': 'Dashboard Web Application',
  'role.Landing Page': 'Landing Page',
  'role.E-commerce Fullstack Web Application': 'E-commerce Fullstack Web Application',
  'role.E-commerce Web Application': 'E-commerce Web Application',
  'role.Healthcare Web Application': 'Healthcare Web Application',
  'role.Interactive 3D Website': 'Interactive 3D Website',
  
  // Contact
  'contact.title': 'Contact',
  'contact.titleHighlight': 'Me',
  'contact.heading': 'Connect with me',
  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.formTitle': 'Send a message',
  'contact.formDescription': 'Leave your information, I will respond within 24 hours.',
  'contact.fullName': 'Full Name',
  'contact.subject': 'Subject',
  'contact.message': 'Your Message',
  'contact.send': 'Send Message',
  'contact.success': 'Thank you for your message! I will get back to you soon.',
  
  // Footer
  'footer.builtWith': 'Built with',
  'footer.copyright': 'Copyright by {name} | © {year}',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: 'en', t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
