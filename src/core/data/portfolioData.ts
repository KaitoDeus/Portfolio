import { IPortfolioData } from '@/core/models/PortfolioModels';

import avatar from '@/assets/img/avt/avatar.webp';
import geminiEducator from '@/assets/img/cert/gemini-educator.webp';
import intermediateDiploma from '@/assets/img/cert/intermediate-diploma.webp';
import aiFluencyFramework from '@/assets/img/cert/Al-Fluency-Framework-Foundations.webp';
import logoUTH from '@/assets/logo/logo-UTH.webp';
import logoCDN from '@/assets/logo/Logo-CĐN.webp';

import {
  projectCaro,
  projectPhotoPalette,
  projectNeoShop,
  projectMedicare,
  projectUthwm,
  projectTeliViettel,
  projectFirst2DGame,
} from '@/assets/img/proj';

export const portfolioData: IPortfolioData = {
  name: 'Anh Khai',
  roles: [
    'Software Developer',
  ],
  tagline: "I'm a",
  bio: "Third-year IT student with practical experience in software and game development. Experienced in building desktop applications, web applications, and game projects using modern development technologies. Seeking a Software Developer Internship to contribute, learn, and grow in a professional engineering environment.",
  avatars: {
    hero: avatar,
    about: avatar,
    skills: avatar,
    contact: avatar,
  },
  socialLinks: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/kaitodeus/?locale=en_US',
      label: 'LinkedIn Profile',
    },
    {
      platform: 'github',
      url: 'https://github.com/KaitoDeus',
      label: 'GitHub Profile',
    },
    {
      platform: 'mail',
      url: 'mailto:khaivo300605@gmail.com',
      label: 'Email Me',
    },
  ],
  personalInfo: {
    fullname: 'Vo Anh Khai',
    dateOfBirth: '30/06/2005',
    gender: 'Male',
    address: 'Gia Dinh Ward, HCMC',
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
      year: 'Sept 2023 - Jun 2027',
      title: 'University of Transport Ho Chi Minh City',
      location: 'Hồ Chí Minh',
      subtitle: "Bachelor's degree, Information Technology",
      logo: logoUTH,
      extra: '',
      details: [],
    },
    {
      year: 'Aug 2020 - Jul 2022',
      title: 'Ho Chi Minh Vocational College',
      location: 'Hồ Chí Minh',
      subtitle: 'Intermediate Degree, IT (Software Application)',
      logo: logoCDN,
      extra: "Graduation Project: [FARMER KUN's STORE](https://kenkaneki395.wixsite.com/site)",
      details: [],
    },
  ],
  career: [
    {
      year: 'March 2026 - Present',
      title: 'Freelance',
      location: 'Remote',
      subtitle: 'Web Developer',
      logo: '/freelance.jpg',
      extra: `HEART of CLASSY - Handbag E-Commerce Website
- In progress (Jun 01 2026 - Aug 30 2026)

[TELI Viettel](https://teli-viettel.vercel.app/) - Digital Learning Platform
- Academic project developed for the Project Management course at Van Lang University
- Built an AI-powered web platform to help teachers in remote areas generate teaching materials more efficiently
- Collaborated on the project from Mar 13 - Mar 23, 2026, in an agile team environment
- Applied Figma MCP to ensure code closely matched the original design specifications`,
    },
  ],
  skills: [
    // Frontend
    {
      name: 'React',
      icon: 'react',
      color: '#61DAFB',
      category: 'frontend',
      level: 'Advanced',
      description: 'Hooks, Redux, Component Lifecycle',
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
      color: '#3178C6',
      category: 'frontend',
      level: 'Intermediate',
      description: 'Strong Typing, Interfaces, Generics',
    },
    {
      name: 'JavaScript',
      icon: 'javascript',
      color: '#f7df1e',
      category: 'frontend',
      level: 'Advanced',
      description: 'ES6+, Async/Await, DOM Manipulation',
    },
    {
      name: 'HTML5',
      icon: 'html5',
      color: '#e44d26',
      category: 'frontend',
      level: 'Advanced',
      description: 'Semantic Structure, Accessibility',
    },
    {
      name: 'CSS3',
      icon: 'css3',
      color: '#1572b6',
      category: 'frontend',
      level: 'Intermediate',
      description: 'Flexbox, Grid, Responsive Design',
    },
    {
      name: 'Tailwind CSS',
      icon: 'tailwindcss',
      color: '#06B6D4',
      category: 'frontend',
      level: 'Advanced',
      description: 'Utility-first, Responsive Layouts',
    },


    // Backend
    {
      name: 'Java',
      icon: 'java',
      color: '#f89820',
      category: 'backend',
      level: 'Advanced',
      description: 'OOP, Stream, Exception, JVM basics',
    },
    {
      name: 'Spring Boot',
      icon: 'spring',
      color: '#6DB33F',
      category: 'backend',
      level: 'Advanced',
      description: 'REST API, Validation, Pagination',
    },
    {
      name: 'C#',
      icon: 'csharp',
      color: '#239120',
      category: 'backend',
      level: 'Advanced',
      description: 'Desktop App, Windows Forms, LINQ',
    },
    {
      name: '.NET',
      icon: 'dotnet',
      color: '#512BD4',
      category: 'backend',
      level: 'Intermediate',
      description: 'Enterprise Framework, CLR',
    },

    {
      name: 'NodeJS',
      icon: 'nodejs',
      color: '#339933',
      category: 'backend',
      level: 'Intermediate',
      description: 'Server-side JavaScript environment',
    },
    {
      name: 'ExpressJS',
      icon: 'express',
      color: '#ffffff',
      category: 'backend',
      level: 'Intermediate',
      description: 'Fast, unopinionated web framework for Node.js',
    },

    // Database
    {
      name: 'MySQL',
      icon: 'mysql',
      color: '#4479A1',
      category: 'database',
      level: 'Intermediate',
      description: 'Indexing, Transaction, Query Optimization',
    },
    {
      name: 'SQL Server',
      icon: 'sql',
      color: '#CC2927',
      category: 'database',
      level: 'Intermediate',
      description: 'Stored Procedures, Triggers',
    },
    {
      name: 'PostgreSQL',
      icon: 'postgresql',
      color: '#4169E1',
      category: 'database',
      level: 'Intermediate',
      description: 'Relational Database, JSONB',
    },
    {
      name: 'MongoDB',
      icon: 'mongodb',
      color: '#47A248',
      category: 'database',
      level: 'Beginner',
      description: 'NoSQL, Aggregation Framework',
    },

    // DevOps & Tools
    {
      name: 'Docker',
      icon: 'docker',
      color: '#2496ED',
      category: 'devops',
      level: 'Intermediate',
      description: 'Containerization (Backend focus)',
    },
    {
      name: 'Git',
      icon: 'git',
      color: '#F05032',
      category: 'devops',
      level: 'Advanced',
      description: 'Version Control, Branching Strategies',
    },
    {
      name: 'Vite',
      icon: 'vite',
      color: '#646CFF',
      category: 'devops',
      level: 'Advanced',
      description: 'Modern Frontend Build Tool',
    },

    {
      name: 'Velo (Wix)',
      icon: 'wix',
      color: '#ffffff',
      category: 'devops',
      level: 'Intermediate',
      description: 'Wix Fullstack Platform',
    },
    {
      name: 'Vercel',
      icon: 'vercel',
      color: '#000000',
      category: 'devops',
      level: 'Intermediate',
      description: 'Deployment, CI/CD Integration',
    },
    {
      name: 'Render',
      icon: 'render',
      color: '#46E3B7',
      category: 'devops',
      level: 'Intermediate',
      description: 'Cloud Hosting, Auto-deploy',
    },
  ],
  certificates: [
    {
      title: 'Gemini Certified Educator',
      image: geminiEducator,
      rating: 1,
      status: '',
    },
    {
      title: 'Intermediate Diploma',
      image: intermediateDiploma,
      rating: 1,
      status: '',
    },
    {
      title: 'AI Fluency Framework: Foundations',
      image: aiFluencyFramework,
      rating: 1,
      status: '',
    },
  ],
  projects: [
    {
      id: 'teli-viettel',
      title: 'TELI Viettel',
      image: projectTeliViettel,
      role: 'AI-Powered Learning Platform',
      link: 'https://teli-viettel.vercel.app/',
      githubLink: 'https://github.com/KaitoDeus/TELI_Viettel',
      status: 'completed',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
      startDate: '2026-03-25',
      category: 'personal',
    },
    {
      id: 'photo-palette',
      title: 'Photo Palette',
      image: projectPhotoPalette,
      role: 'Landing Page',
      link: 'https://photo-palette.vercel.app/',
      githubLink: 'https://github.com/KaitoDeus/Photo-Palette',
      status: 'completed',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      startDate: '2026-02-04',
      category: 'personal',
    },
    {
      id: 'neoshop',
      title: 'NeoShop E-commerce',
      image: projectNeoShop,
      role: 'E-commerce Fullstack Web Application',
      link: 'https://neoshop-ecommerce.vercel.app/',
      githubLink: 'https://github.com/KaitoDeus/NeoShop',
      status: 'completed',
      technologies: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      startDate: '2026-01-22',
      category: 'personal',
    },

    {
      id: 'caro',
      title: 'Game Caro',
      image: projectCaro,
      role: 'Desktop Application',
      link: 'https://gamecaro-uth.vercel.app/',
      githubLink: 'https://github.com/KaitoDeus/CARO',
      status: 'completed',
      technologies: ['C#', '.NET', 'Windows Forms'],
      startDate: '2025-12-02',
      category: 'school',
    },
    {
      id: 'medicare',
      title: 'Medicare Webapp',
      image: projectMedicare,
      role: 'Healthcare Web Application',
      link: 'https://medicare-webapp-goll.onrender.com/',
      githubLink: 'https://github.com/KaitoDeus/MediCare_Webapp',
      status: 'completed',
      technologies: ['MongoDB', 'ExpressJS', 'React', 'NodeJS'],
      startDate: '2025-11-01',
      category: 'school',
    },
    {
      id: 'uth-wm',
      title: 'UTH - Work Management',
      image: projectUthwm,
      role: 'Desktop Application',
      link: '',
      githubLink: 'https://github.com/KaitoDeus/UTH-WM',
      status: 'completed',
      technologies: ['C#', '.NET', 'Windows Forms'],
      startDate: '2024-12-19',
      category: 'school',
    },

    {
      id: 'first-2d-game',
      title: 'First 2D Game Tutorial',
      image: projectFirst2DGame,
      role: 'Unity Developer',
      link: 'https://kaitodesu.itch.io/first2dgametutorial',
      githubLink: 'https://github.com/KaitoDeus/First2DGameTutorial',
      status: 'completed',
      technologies: ['C#', 'Unity'],
      startDate: '2024-05-01',
      category: 'unity',
    },
  ],
};
