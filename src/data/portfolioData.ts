import { 
  PortfolioData, 
  SocialLink, 
  PersonalInfo, 
  Hobby, 
  TimelineItem, 
  Skill, 
  Certificate, 
  Project 
} from '../models/PortfolioModels';

import avatar1 from '../assets/img/avt/avatar1.jpg';
import avatar from '../assets/img/avt/avatar.jpg';
import csharpCert from '../assets/img/cert/Csharp-cert.png';
import jsCert from '../assets/img/cert/JavaScript-cert.png';
import projectCaro from '../assets/img/proj/project_caro.png';
import projectEvWarranty from '../assets/img/proj/project_evwarranty.png';
import projectPhotoPalette from '../assets/img/proj/project_photopalette.png';
import projectNeoShop from '../assets/img/proj/project_neoshop.png';
import projectFarmerStore from '../assets/img/proj/project_farmerstore.png';

// Import project READMEs
import caroReadme from './projects/caro.md?raw';
import evWarrantyReadme from './projects/ev-warranty.md?raw';
import photoPaletteReadme from './projects/photo-palette.md?raw';
import neoshopReadme from './projects/neoshop.md?raw';
import farmerStoreReadme from './projects/famer-kun.md?raw';

import caroReadmeVi from './projects/caro-vi.md?raw';
import evWarrantyReadmeVi from './projects/ev-warranty-vi.md?raw';
import photoPaletteReadmeVi from './projects/photo-palette-vi.md?raw';
import neoshopReadmeVi from './projects/neoshop-vi.md?raw';
import farmerStoreReadmeVi from './projects/famer-kun-vi.md?raw';

export const portfolioData = new PortfolioData(
  'Võ Anh Khải',
  ['Software Engineering'],
  "I'm a",
  'Passionate about learning, exploring new technologies. With hard work and dedication, I believe it will be a solid foundation to help me achieve big career goals and positively impact the world.',
  {
    hero: avatar1,
    about: avatar,
    skills: avatar1,
    contact: avatar1,
  },
  [
    new SocialLink('linkedin', 'https://www.linkedin.com/in/kaitodeus/?locale=en_US', 'LinkedIn Profile'),
    new SocialLink('github', 'https://github.com/KaitoDeus', 'GitHub Profile'),
    new SocialLink('facebook', 'https://www.facebook.com/kaitovo8952/', 'Facebook Profile'),
    new SocialLink('instagram', 'https://www.instagram.com/_kai.desu/', 'Instagram Profile'),
  ],
  new PersonalInfo(
    'Võ Anh Khải',
    '30/06/2005',
    'Information Technology',
    'University of Transport Ho Chi Minh City'
  ),
  [
    new Hobby('game', 'hobby.gaming'),
    new Hobby('code', 'hobby.programming'),
    new Hobby('music', 'hobby.music'),
    new Hobby('book', 'hobby.reading'),
    new Hobby('football', 'hobby.football'),
    new Hobby('brain', 'hobby.learning'),
  ],
  [
    new TimelineItem('2023 - Present', 'about.uthSchool', null, 'about.gpa.uth', null),
    new TimelineItem('2020 - 2022', 'about.vocationalSchool', null, 'about.ranking.goodMVP', null),
  ],
  [
    new TimelineItem('', null, '', null, ''),
  ],
  [
    // Frontend
    new Skill('React', 'react', '#61DAFB', 'frontend', 'Advanced', 'skills.desc.react'),
    new Skill('TypeScript', 'typescript', '#3178C6', 'frontend', 'Intermediate', 'skills.desc.ts'),
    new Skill('JavaScript', 'javascript', '#f7df1e', 'frontend', 'Advanced', 'skills.desc.js'),
    new Skill('HTML5', 'html5', '#e44d26', 'frontend', 'Advanced', 'skills.desc.html'),
    new Skill('CSS3', 'css3', '#1572b6', 'frontend', 'Intermediate', 'skills.desc.css'),

    // Backend
    new Skill('Java', 'java', '#f89820', 'backend', 'Advanced', 'skills.desc.java'),
    new Skill('Spring Boot', 'spring', '#6DB33F', 'backend', 'Advanced', 'skills.desc.spring'),
    new Skill('Spring Security', 'spring', '#6DB33F', 'backend', 'Intermediate', 'skills.desc.security'),
    new Skill('JPA / Hibernate', 'spring', '#6DB33F', 'backend', 'Advanced', 'skills.desc.jpa'),

    // Database
    new Skill('MySQL', 'mysql', '#4479A1', 'database', 'Intermediate', 'skills.desc.mysql'),
    new Skill('SQL Server', 'sql', '#CC2927', 'database', 'Intermediate', 'skills.desc.sqlserver'),
    new Skill('MongoDB', 'mongodb', '#47A248', 'database', 'Beginner', 'skills.desc.mongodb'),

    // DevOps & Tools
    new Skill('Docker', 'docker', '#2496ED', 'devops', 'Intermediate', 'skills.desc.docker'),
    new Skill('Git', 'git', '#F05032', 'devops', 'Advanced', 'skills.desc.git'),
    new Skill('Vercel', 'vercel', '#000000', 'devops', 'Intermediate', 'skills.desc.vercel'),
    new Skill('Render', 'render', '#46E3B7', 'devops', 'Intermediate', 'skills.desc.render'),
  ],
  [
    new Certificate('C# Basic', csharpCert, 5, 'Completed'),
    new Certificate('JavaScript Basic', jsCert, 5, 'Completed'),
  ],
  [
    new Project('caro', 'Game Caro', projectCaro, 'Desktop Application', 'https://gamecaro-uth.vercel.app/', 'https://github.com/KaitoDeus/CARO', 'completed', caroReadme, ['C#', '.NET', 'Windows Forms'], '2025-12-02'),
    new Project('ev-warranty', 'EV Warranty System', projectEvWarranty, 'Dashboard Web Application', 'https://ev-warranty-system.up.railway.app/', 'https://github.com/KaitoDeus/EV-Warranty-System', 'completed', evWarrantyReadme, ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'], '2025-12-19'),
    new Project('photo-palette', 'Photo Palette', projectPhotoPalette, 'Landing Page', 'https://photo-palette.vercel.app/', 'https://github.com/KaitoDeus/Photo-Palette', 'completed', photoPaletteReadme, ['React', 'TypeScript', 'Tailwind CSS'], '2026-02-04'),
    new Project('neoshop', 'NeoShop E-commerce', projectNeoShop, 'E-commerce Fullstack Web Application', 'https://neoshop-ecommerce.vercel.app/', 'https://github.com/KaitoDeus/NeoShop', 'completed', neoshopReadme, ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'], '2026-01-22'),
    new Project('famer-kun', 'FAMER-KUN Store', projectFarmerStore, 'E-commerce Web Application', 'https://kenkaneki395.wixsite.com/site', 'https://github.com/KaitoDeus/FAMER-KUN.Store', 'completed', farmerStoreReadme, ['Velo', 'JavaScript', 'Wix'], '2022-05-01'),
  ],
  'https://drive.usercontent.google.com/u/0/uc?id=1Z22-lHjWJEq3R16EqIbo8aP0WbuleGiQ&export=download'
);

export const projectsVi: Project[] = [
  new Project('caro', 'Game Caro', projectCaro, 'Desktop Application', 'https://gamecaro-uth.vercel.app/', 'https://github.com/KaitoDeus/CARO', 'completed', caroReadmeVi, ['C#', '.NET', 'Windows Forms'], '2025-12-02'),
  new Project('ev-warranty', 'Hệ thống Bảo hành EV', projectEvWarranty, 'Dashboard Web Application', 'https://ev-warranty-system.up.railway.app/', 'https://github.com/KaitoDeus/EV-Warranty-System', 'completed', evWarrantyReadmeVi, ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'], '2025-12-19'),
  new Project('photo-palette', 'Photo Palette', projectPhotoPalette, 'Landing Page', 'https://photo-palette.vercel.app/', 'https://github.com/KaitoDeus/Photo-Palette', 'completed', photoPaletteReadmeVi, ['React', 'TypeScript', 'Tailwind CSS'], '2026-02-04'),
  new Project('neoshop', 'Thương mại điện tử NeoShop', projectNeoShop, 'E-commerce Fullstack Web Application', 'https://neoshop-ecommerce.vercel.app/', 'https://github.com/KaitoDeus/NeoShop', 'completed', neoshopReadmeVi, ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'], '2026-01-22'),
  new Project('famer-kun', 'Cửa hàng FAMER-KUN', projectFarmerStore, 'E-commerce Web Application', 'https://kenkaneki395.wixsite.com/site', 'https://github.com/KaitoDeus/FAMER-KUN.Store', 'completed', farmerStoreReadmeVi, ['Velo', 'JavaScript', 'Wix'], '2022-05-01'),
];
