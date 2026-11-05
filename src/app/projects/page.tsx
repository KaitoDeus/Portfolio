import type { Metadata } from 'next';
import ProjectsPage from '@/sections/Projects/ProjectsPage';

export const metadata: Metadata = {
  title: 'Projects Showcase',
  description:
    'Featured software and game projects by Võ Anh Khải (Kaito): 3D Driving Simulator, HabitFlow mobile app, 8-Puzzle AI Game, NeoShop e-commerce, and Game Caro.',
  alternates: {
    canonical: '/projects',
  },
};

export default function Page() {
  return <ProjectsPage />;
}
