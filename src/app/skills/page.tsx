import type { Metadata } from 'next';
import SkillsPage from '@/sections/Skills/SkillsPage';

export const metadata: Metadata = {
  title: 'Skills & Tech Stack',
  description:
    'Technical arsenal, frameworks, 3D game engines, languages (React, Next.js, Unity, Spring Boot, Kotlin), and developer tools of Võ Anh Khải (Kaito).',
  alternates: {
    canonical: '/skills',
  },
};

export default function Page() {
  return <SkillsPage />;
}
