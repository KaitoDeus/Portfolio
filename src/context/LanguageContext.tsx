import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
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
    'about.goal1': 'Complete a Software Engineer internship at a tech company in 2025.',
    'about.goal2': 'Develop problem-solving skills through real-world projects.',
    'about.goal3': 'Learn best practices and professional software development processes.',
    'about.hobbies': 'Hobbies',
    'about.certificates': 'Certificates',
    'about.education': 'Education',
    'about.careerTimeline': 'Career Timeline',
    'about.infoTech': 'Information Technology',
    'about.uthSchool': 'University of Transport Ho Chi Minh City',
    'about.hcmCity': 'Ho Chi Minh City',
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
    'skills.highlight1': 'Build web applications with modern frameworks',
    'skills.highlight2': 'Game development with Unity and C#',
    'skills.highlight3': 'Full-stack development with Spring Boot + React',
    'skills.highlight4': 'Database design and optimization',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.status.completed': 'Completed',
    'projects.status.inProgress': 'In Progress',
    
    // Contact
    'contact.title': 'Contact',
    'contact.titleHighlight': 'Me',
    'contact.heading': 'Connect with {name}',
    'contact.description': "I'm looking for internship opportunities and career development. If you have a project to discuss or a collaboration opportunity, please get in touch!",
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
    'footer.copyright': 'Copyright by {name} | © {year}',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.skills': 'Kỹ năng',
    'nav.projects': 'Dự án',
    'nav.contact': 'Liên hệ',
    
    // Hero
    'hero.greeting': "Tôi là một",
    'hero.role': 'Kỹ sư phần mềm',
    'hero.from': 'đến từ Việt Nam.',
    'hero.viewSkills': 'Xem kỹ năng',
    'hero.downloadCV': 'Tải CV',
    
    // About
    'about.title': 'Về tôi',
    'about.tagline': 'Sử dụng công nghệ để thay đổi thế giới',
    'about.bio': "Mình là {name}, sinh viên ngành Công nghệ thông tin tại {school}. Mình đam mê lập trình game và phát triển phần mềm, luôn tìm tòi học hỏi công nghệ mới để tạo ra những sản phẩm sáng tạo và hữu ích.",
    'about.personalInfo': 'Thông tin cá nhân',
    'about.fullname': 'Họ và tên',
    'about.dob': 'Ngày sinh',
    'about.major': 'Chuyên ngành',
    'about.school': 'Trường',
    'about.careerGoals': 'Mục tiêu nghề nghiệp',
    'about.goal1': 'Hoàn thành thực tập Software Engineer tại doanh nghiệp công nghệ 2025.',
    'about.goal2': 'Phát triển kỹ năng giải quyết vấn đề qua các dự án thực tế.',
    'about.goal3': 'Học hỏi best practices và quy trình phát triển phần mềm chuyên nghiệp.',
    'about.hobbies': 'Sở thích',
    'about.certificates': 'Chứng chỉ',
    'about.education': 'Trình độ học vấn',
    'about.careerTimeline': 'Lộ trình sự nghiệp',
    'about.infoTech': 'Công nghệ thông tin',
    'about.uthSchool': 'Đại học Giao Thông Vận Tải TP. HCM',
    'about.hcmCity': 'Hồ Chí Minh',
    'about.now': 'nay',
    
    // Hobbies
    'hobby.gaming': 'Chơi game',
    'hobby.programming': 'Lập trình',
    'hobby.music': 'Nhạc cổ điển',
    'hobby.reading': 'Đọc sách',
    'hobby.football': 'Bóng đá',
    'hobby.learning': 'Học công nghệ mới',
    
    // Skills
    'skills.title': 'Kỹ năng',
    'skills.tagline': 'Lập trình viên đam mê khám phá mọi công nghệ',
    'skills.terminal.whoami': 'kỹ_sư_phần_mềm',
    'skills.terminal.motto': '"Xây dựng. Triển khai. Cải tiến."',
    'skills.highlight1': 'Xây dựng ứng dụng web với framework hiện đại',
    'skills.highlight2': 'Phát triển game với Unity và C#',
    'skills.highlight3': 'Full-stack với Spring Boot + React',
    'skills.highlight4': 'Thiết kế và tối ưu cơ sở dữ liệu',
    
    // Projects
    'projects.title': 'Dự án',
    'projects.status.completed': 'Hoàn thành',
    'projects.status.inProgress': 'Đang phát triển',
    
    // Contact
    'contact.title': 'Liên hệ',
    'contact.titleHighlight': 'với tôi',
    'contact.heading': 'Kết nối cùng {name}',
    'contact.description': 'Mình đang tìm kiếm cơ hội thực tập và phát triển sự nghiệp. Nếu bạn có dự án muốn trao đổi hoặc cơ hội hợp tác, hãy liên hệ với mình nhé!',
    'contact.email': 'Email',
    'contact.phone': 'Điện thoại',
    'contact.formTitle': 'Gửi tin nhắn',
    'contact.formDescription': 'Hãy để lại thông tin, mình sẽ phản hồi trong vòng 24 giờ.',
    'contact.fullName': 'Họ và tên',
    'contact.subject': 'Chủ đề',
    'contact.message': 'Nội dung tin nhắn',
    'contact.send': 'Gửi tin nhắn',
    'contact.success': 'Cảm ơn bạn đã liên hệ! Mình sẽ phản hồi sớm nhất có thể.',
    
    // Footer
    'footer.copyright': 'Bản quyền thuộc về {name} | © {year}',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
