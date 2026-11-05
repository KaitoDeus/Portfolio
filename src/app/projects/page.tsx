import type { Metadata } from 'next';
import ProjectsPage from '@/sections/Projects/ProjectsPage';

export const metadata: Metadata = {
  title: 'Projects | Võ Anh Khải',
  description:
    'Featured projects by Võ Anh Khải: 3D Driving Simulator, HabitFlow mobile app, 8-Puzzle AI, NeoShop e-commerce, and Game Caro.',
};

export default function Page() {
  return <ProjectsPage />;
}
