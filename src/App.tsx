import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import './index.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname);
    }
  }, []);

  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
