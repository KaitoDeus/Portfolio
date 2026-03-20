import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    <MainLayout>
      <ScrollToTop />
      <Routes>
         <Route path="/" element={<HomePage />} />
         {/* Redirect any other path to home since it's now a single page */}
         <Route path="*" element={<HomePage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
