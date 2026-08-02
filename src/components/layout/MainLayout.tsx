import { ReactNode } from 'react';
import Header from './Header';
import SpotifyPlayer from '../common/SpotifyPlayer';
import CustomCursor from '../common/CustomCursor';
import InteractiveParticles from '../common/InteractiveParticles';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <InteractiveParticles />
      <CustomCursor />
      <Header />
      <main className="grow relative z-10">
        {children}
      </main>
      <SpotifyPlayer />
    </div>
  );
}
