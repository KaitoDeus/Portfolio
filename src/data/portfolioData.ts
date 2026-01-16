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
import projectMedicare from '../assets/img/proj/project_medicare.png';
import projectCaro from '../assets/img/proj/project_wm.png';
import projectMedic from '../assets/img/proj/project_medic.png';
import projectEvShare from '../assets/img/proj/project_evshare.png';

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
    new Project('Medicare Booking Webapp', projectMedicare, 'Project Manager & DevOps', 'https://github.com/KaitoDeus/MediCare_Webapp', 'completed'),
    new Project('Caro', projectCaro, 'Winforms Developer', 'https://github.com/KaitoDeus/CARO', 'completed'),
    new Project('Medical Consultation Website', projectMedic, 'UI/UX Design', 'https://github.com/KaitoDeus/Medical-Consultation-Website', 'in-progress'),
    new Project('EV-Co-ownership-Cost-sharing-System', projectEvShare, 'Backend Developer', 'https://github.com/TheBlueStars/EV-Co-ownership-Cost-sharing-System', 'in-progress'),
  ],
  'https://drive.usercontent.google.com/u/0/uc?id=1Z22-lHjWJEq3R16EqIbo8aP0WbuleGiQ&export=download'
);
