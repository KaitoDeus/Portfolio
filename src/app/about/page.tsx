import type { Metadata } from 'next';
import AboutPage from '@/sections/About/AboutPage';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Background, practical experience, career objectives, and certifications of Võ Anh Khải (Kaito) - Software & Game Developer.',
  alternates: {
    canonical: '/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
