import { 
  IPortfolioData
} from '@/core/models/PortfolioModels';

import avatar1 from '@/assets/img/avt/avatar1.jpg';
import avatar from '@/assets/img/avt/avatar.jpg';
import geminiEducator from '@/assets/img/cert/gemini-educator.jpg';
import geminiStudent from '@/assets/img/cert/gemini-student.jpg';
import projectCaro from '@/assets/img/proj/project_caro.png';
import projectEvWarranty from '@/assets/img/proj/project_evwarranty.png';
import projectPhotoPalette from '@/assets/img/proj/project_photopalette.png';
import projectNeoShop from '@/assets/img/proj/project_neoshop.png';
import projectFarmerStore from '@/assets/img/proj/project_farmerstore.png';
import projectChristmas from '@/assets/img/proj/project_christmas.png';
import projectMedicare from '@/assets/img/proj/project_medicare.png';
import projectUthwm from '@/assets/img/proj/project_uthwm.png';

// Import project READMEs
import caroReadme from './projects/caro.md?raw';
import evWarrantyReadme from './projects/ev-warranty.md?raw';
import photoPaletteReadme from './projects/photo-palette.md?raw';
import neoshopReadme from './projects/neoshop.md?raw';
import farmerStoreReadme from './projects/famer-kun.md?raw';
import uthWmReadme from './projects/uth-wm.md?raw';
import medicareReadme from './projects/medicare.md?raw';
import merryChristmasReadme from './projects/merry-christmas.md?raw';

export const portfolioData: IPortfolioData = {
  name: 'Anh Khai',
  roles: ['Software Engineer', 'AI Engineer', 'Frontend Developer', 'Game Developer'],
  tagline: "I'm a",
  bio: 'Passionate about learning, exploring new technologies. With hard work and dedication, I believe it will be a solid foundation to help me achieve big career goals and positively impact the world.',
  avatars: {
    hero: avatar1,
    about: avatar,
    skills: avatar1,
    contact: avatar1,
  },
  socialLinks: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/kaitodeus/?locale=en_US', label: 'LinkedIn Profile' },
    { platform: 'github', url: 'https://github.com/KaitoDeus', label: 'GitHub Profile' },
  ],
  personalInfo: {
    fullname: 'Vo Anh Khai',
    dateOfBirth: '30/06/2005',
    major: 'Information Technology',
    school: 'University of Transport Ho Chi Minh City',
    careerObjective: '',
  },
  hobbies: [
    { icon: 'game', title: 'Gaming' },
    { icon: 'code', title: 'Programming' },
    { icon: 'music', title: 'Classical Music' },
    { icon: 'book', title: 'Reading' },
    { icon: 'football', title: 'Football' },
    { icon: 'brain', title: 'Learning new Tech' },
  ],
  education: [
    { 
      year: '2023 - 2026', 
      title: 'UTH - University of Transport Ho Chi Minh City', 
      location: 'Hồ Chí Minh', 
      subtitle: "Bachelor's degree, Information Technology", 
      extra: 'Grade: 3.2/4' 
    },
    { 
      year: '2020 - 2022', 
      title: 'Ho Chi Minh Vocational College', 
      location: 'Hồ Chí Minh', 
      subtitle: 'Intermediate Degree, IT (Software Application)', 
      extra: 'Grade: 8.7/10',
      details: ['Top Graduate', 'Class President']
    },
  ],
  career: [
    { year: '', title: null, location: '', subtitle: null, extra: '' },
  ],
  skills: [
    // Frontend
    { name: 'React', icon: 'react', color: '#61DAFB', category: 'frontend', level: 'Advanced', description: 'Hooks, Redux, Component Lifecycle' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6', category: 'frontend', level: 'Intermediate', description: 'Strong Typing, Interfaces, Generics' },
    { name: 'JavaScript', icon: 'javascript', color: '#f7df1e', category: 'frontend', level: 'Advanced', description: 'ES6+, Async/Await, DOM Manipulation' },
    { name: 'HTML5', icon: 'html5', color: '#e44d26', category: 'frontend', level: 'Advanced', description: 'Semantic Structure, Accessibility' },
    { name: 'CSS3', icon: 'css3', color: '#1572b6', category: 'frontend', level: 'Intermediate', description: 'Flexbox, Grid, Responsive Design' },
    { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4', category: 'frontend', level: 'Advanced', description: 'Utility-first, Responsive Layouts' },
    { name: 'Three.js', icon: 'threejs', color: '#ffffff', category: 'frontend', level: 'Intermediate', description: '3D Web Experiences, WebGL' },

    // Backend
    { name: 'Java', icon: 'java', color: '#f89820', category: 'backend', level: 'Advanced', description: 'OOP, Stream, Exception, JVM basics' },
    { name: 'Spring Boot', icon: 'spring', color: '#6DB33F', category: 'backend', level: 'Advanced', description: 'REST API, Validation, Pagination' },
    { name: 'C#', icon: 'csharp', color: '#239120', category: 'backend', level: 'Advanced', description: 'Desktop App, Windows Forms, LINQ' },
    { name: '.NET', icon: 'dotnet', color: '#512BD4', category: 'backend', level: 'Intermediate', description: 'Enterprise Framework, CLR' },
    { name: 'Python', icon: 'python', color: '#3776AB', category: 'backend', level: 'Intermediate', description: 'Data Science, FastAPI, Automation' },
    { name: 'FastAPI', icon: 'fastapi', color: '#05998B', category: 'backend', level: 'Intermediate', description: 'High Performance Python Backend' },

    // Database
    { name: 'MySQL', icon: 'mysql', color: '#4479A1', category: 'database', level: 'Intermediate', description: 'Indexing, Transaction, Query Optimization' },
    { name: 'SQL Server', icon: 'sql', color: '#CC2927', category: 'database', level: 'Intermediate', description: 'Stored Procedures, Triggers' },
    { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1', category: 'database', level: 'Intermediate', description: 'Relational Database, JSONB' },
    { name: 'MongoDB', icon: 'mongodb', color: '#47A248', category: 'database', level: 'Beginner', description: 'NoSQL, Aggregation Framework' },

    // DevOps & Tools
    { name: 'Docker', icon: 'docker', color: '#2496ED', category: 'devops', level: 'Intermediate', description: 'Containerization (Backend focus)' },
    { name: 'Git', icon: 'git', color: '#F05032', category: 'devops', level: 'Advanced', description: 'Version Control, Branching Strategies' },
    { name: 'Vite', icon: 'vite', color: '#646CFF', category: 'devops', level: 'Advanced', description: 'Modern Frontend Build Tool' },
    { name: 'MediaPipe AI', icon: 'mediapipe', color: '#0070F3', category: 'devops', level: 'Beginner', description: 'On-device Machine Learning' },
    { name: 'Velo (Wix)', icon: 'wix', color: '#ffffff', category: 'devops', level: 'Intermediate', description: 'Wix Fullstack Platform' },
    { name: 'Vercel', icon: 'vercel', color: '#000000', category: 'devops', level: 'Intermediate', description: 'Deployment, CI/CD Integration' },
    { name: 'Render', icon: 'render', color: '#46E3B7', category: 'devops', level: 'Intermediate', description: 'Cloud Hosting, Auto-deploy' },
  ],
  certificates: [
    { title: 'Gemini Certified Educator', image: geminiEducator, rating: 1, status: '' },
    { title: 'Gemini Certified Student', image: geminiStudent, rating: 1, status: '' },
  ],
  projects: [
    { id: 'caro', title: 'Game Caro', image: projectCaro, role: 'Desktop Application', link: 'https://gamecaro-uth.vercel.app/', githubLink: 'https://github.com/KaitoDeus/CARO', status: 'completed', readmeContent: caroReadme, technologies: ['C#', '.NET', 'Windows Forms'], startDate: '2025-12-02', category: 'school' },
    { id: 'ev-warranty', title: 'EV Warranty System', image: projectEvWarranty, role: 'Dashboard Web Application', link: 'https://ev-warranty-system.up.railway.app/', githubLink: 'https://github.com/KaitoDeus/EV-Warranty-System', status: 'completed', readmeContent: evWarrantyReadme, technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'], startDate: '2025-12-19', category: 'school' },
    { id: 'photo-palette', title: 'Photo Palette', image: projectPhotoPalette, role: 'Landing Page', link: 'https://photo-palette.vercel.app/', githubLink: 'https://github.com/KaitoDeus/Photo-Palette', status: 'completed', readmeContent: photoPaletteReadme, technologies: ['React', 'TypeScript', 'Tailwind CSS'], startDate: '2026-02-04', category: 'personal' },
    { id: 'neoshop', title: 'NeoShop E-commerce', image: projectNeoShop, role: 'E-commerce Fullstack Web Application', link: 'https://neoshop-ecommerce.vercel.app/', githubLink: 'https://github.com/KaitoDeus/NeoShop', status: 'completed', readmeContent: neoshopReadme, technologies: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'], startDate: '2026-01-22', category: 'personal' },
    { id: 'famer-kun', title: 'FAMER-KUN Store', image: projectFarmerStore, role: 'E-commerce Web Application', link: 'https://kenkaneki395.wixsite.com/site', githubLink: 'https://github.com/KaitoDeus/FAMER-KUN.Store', status: 'completed', readmeContent: farmerStoreReadme, technologies: ['Velo', 'JavaScript', 'Wix'], startDate: '2022-05-01', category: 'school' },
    { id: 'uth-wm', title: 'UTH - Work Management', image: projectUthwm, role: 'Desktop Application', link: '', githubLink: 'https://github.com/KaitoDeus/UTH-WM', status: 'completed', readmeContent: uthWmReadme, technologies: ['C#', '.NET', 'Windows Forms'], startDate: '2024-12-19', category: 'school' },
    { id: 'medicare', title: 'Medicare Webapp', image: projectMedicare, role: 'Healthcare Web Application', link: 'https://medicare-webapp-goll.onrender.com/', githubLink: 'https://github.com/KaitoDeus/MediCare_Webapp', status: 'completed', readmeContent: medicareReadme, technologies: ['React', 'Vite', 'Tailwind CSS'], startDate: '2025-11-01', category: 'school' },
    { id: 'merry-christmas', title: 'Merry Christmas 3D AI', image: projectChristmas, role: 'Interactive 3D Website', link: 'https://merry-christmas-khai-25.vercel.app', githubLink: 'https://github.com/KaitoDeus/Merry-Christmas-25', status: 'completed', readmeContent: merryChristmasReadme, technologies: ['Three.js', 'Python', 'FastAPI', 'MediaPipe AI'], startDate: '2025-12-24', category: 'personal' },
  ],
  cvDownloadUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1Z22-lHjWJEq3R16EqIbo8aP0WbuleGiQ&export=download'
};
