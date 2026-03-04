import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import SkillsPage from './pages/Skills/SkillsPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ContactPage from './pages/Contact/ContactPage';
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
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
