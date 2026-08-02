import { ReactNode } from 'react';
import Header from './Header';
import SpotifyPlayer from '../common/SpotifyPlayer';
import CustomCursor from '../common/CustomCursor';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <CustomCursor />
      <Header />
      <main className="grow">
        {children}
      </main>
      <SpotifyPlayer />
    </div>
  );
}
