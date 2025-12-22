import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: 'Võ Anh Khải',
  roles: [
    'Software Engineering'
  ],
  tagline: "I'm a",
  bio: 'Passionate about learning, exploring new technologies. With hard work and dedication, I believe it will be a solid foundation to help me achieve big career goals and positively impact the world.',
  
  avatars: {
    hero: '/img/avt/avatar1.jpg',
    about: '/img/avt/avatar.jpg',
    skills: '/img/avt/avatar1.jpg',
    contact: '/img/avt/avatar1.jpg',
  },

  socialLinks: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/kaitodeus/?locale=en_US', label: 'LinkedIn Profile' },
    { platform: 'github', url: 'https://github.com/KaitoDeus', label: 'GitHub Profile' },
    { platform: 'facebook', url: 'https://www.facebook.com/kaitovo8952/', label: 'Facebook Profile' },
    { platform: 'instagram', url: 'https://www.instagram.com/_kai.desu/', label: 'Instagram Profile' },
  ],

  personalInfo: {
    fullname: 'Võ Anh Khải',
    dateOfBirth: '30/06/2005',
    major: 'Information Technology',
    school: 'University of Transport Ho Chi Minh City',
    careerObjective: "",
  },

  hobbies: [
    { icon: 'game', titleKey: 'hobby.gaming' },
    { icon: 'code', titleKey: 'hobby.programming' },
    { icon: 'music', titleKey: 'hobby.music' },
    { icon: 'book', titleKey: 'hobby.reading' },
    { icon: 'football', titleKey: 'hobby.football' },
    { icon: 'brain', titleKey: 'hobby.learning' },
  ],

  education: [
    { year: '2023', titleKey: 'about.uthSchool', locationKey: 'about.hcmCity' },
  ],

  career: [
    { year: '', title: '', location: '' },
  ],

  skills: [
    { name: 'C++', icon: 'cpp', color: '#00599C', percentage: 80 },
    { name: 'C#', icon: 'csharp', color: '#3f3f3f', percentage: 80 },
    { name: 'HTML5', icon: 'html5', color: '#e44d26', percentage: 80 },
    { name: 'CSS3', icon: 'css3', color: '#1572b6', percentage: 80 },
    { name: 'JavaScript', icon: 'javascript', color: '#f7df1e', percentage: 80 },
    { name: 'Java', icon: 'java', color: '#f89820', percentage: 70 },
    { name: 'PostgreSQL', icon: 'postgresql', color: '#6b6b6b', percentage: 70 },
    { name: 'Spring Boot', icon: 'spring', color: '#6DB33F', percentage: 60 },
    { name: 'Python', icon: 'python', color: '#bd6d2b', percentage: 50 },
  ],

  certificates: [
    { image: '/img/cert/Csharp-cert.png', title: 'C# Basic', rating: 5, status: 'Completed' },
    { image: '/img/cert/JavaScript-cert.png', title: 'JavaScript Basic', rating: 5, status: 'Completed' },
  ],

  projects: [
    {
      image: '/img/proj/project_medicare.png',
      title: 'Medicare Booking Webapp',
      role: 'Project Manager & DevOps',
      link: 'https://github.com/KaitoDeus/MediCare_Webapp',
      status: 'completed',
    },
    {
      image: '/img/proj/project_wm.png',
      title: 'Caro',
      role: 'Winforms Developer',
      link: 'https://github.com/KaitoDeus/CARO',
      status: 'completed',
    },
    {
      image: '/img/proj/project_medic.png',
      title: 'Medical Consultation Website',
      role: 'UI/UX Design',
      link: 'https://github.com/KaitoDeus/Medical-Consultation-Website',
      status: 'in-progress',
    },
    {
      image: '/img/proj/project_evshare.png',
      title: 'EV-Co-ownership-Cost-sharing-System',
      role: 'Backend Developer',
      link: 'https://github.com/TheBlueStars/EV-Co-ownership-Cost-sharing-System',
      status: 'in-progress',
    },
  ],

  cvDownloadUrl: 'https://drive.usercontent.google.com/u/0/uc?id=1Z22-lHjWJEq3R16EqIbo8aP0WbuleGiQ&export=download',
};
