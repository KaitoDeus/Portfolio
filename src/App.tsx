import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import SkillsPage from './pages/Skills/SkillsPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ContactPage from './pages/Contact/ContactPage';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainLayout>
          <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/about" element={<AboutPage />} />
             <Route path="/skills" element={<SkillsPage />} />
             <Route path="/projects" element={<ProjectsPage />} />
             <Route path="/contact" element={<ContactPage />} />
             {/* Note: In a real app we might want a 404 Not Found route here */}
          </Routes>
        </MainLayout>
        <ScrollToTop />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
