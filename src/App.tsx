import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import SkillsPage from './pages/Skills/SkillsPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ContactPage from './pages/Contact/ContactPage';
import ScrollToTop from './components/common/ScrollToTop'; // Updated path
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainLayout>
          <HomePage />
          <AboutPage />
          <SkillsPage />
          <ProjectsPage />
          <ContactPage />
        </MainLayout>
        <ScrollToTop />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
