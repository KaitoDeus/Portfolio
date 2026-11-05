import type { Metadata } from 'next';
import AboutPage from '@/sections/About/AboutPage';

export const metadata: Metadata = {
  title: 'About Me | Võ Anh Khải',
  description:
    'Background, education, career experience at FPT Software and University of Transport HCM City, goals, and certifications of Võ Anh Khải.',
};

export default function Page() {
  return <AboutPage />;
}
