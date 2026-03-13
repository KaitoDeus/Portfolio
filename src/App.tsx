import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ProjectDetailPage from './pages/Projects/ProjectDetailPage';
import { useEffect } from 'react';
import './index.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainLayout>
          <ScrollToTop />
          <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/projects/:id" element={<ProjectDetailPage />} />
             {/* Redirect any other path to home since it's now a single page */}
             <Route path="*" element={<HomePage />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
