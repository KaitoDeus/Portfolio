'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import CosmicBackground from './CosmicBackground';
import ThreeTransitionCanvas from './ThreeTransitionCanvas';
import Horizontal3DStage from './Horizontal3DStage';
import { Portfolio3DProvider, usePortfolio3D } from '@/shared/context/Portfolio3DContext';
import { cn } from '@/shared/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

function LayoutShell({ children }: MainLayoutProps) {
  const { activeIndex, direction, isTransitioning, isDeckRoute, isUiHidden } = usePortfolio3D();

  return (
    <div className="flex flex-col h-screen w-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <CosmicBackground />
      {isDeckRoute && (
        <ThreeTransitionCanvas
          activeIndex={activeIndex}
          direction={direction}
          isTransitioning={isTransitioning}
        />
      )}
      <Header />
      <main
        className={cn(
          'grow relative z-20 flex flex-col overflow-hidden h-full transition-all duration-500',
          isUiHidden ? 'opacity-0 pointer-events-none scale-[0.98]' : 'opacity-100 scale-100'
        )}
      >
        {isDeckRoute ? (
          <Horizontal3DStage />
        ) : (
          <div className="h-full overflow-y-auto pt-16 pb-24 lg:pt-16 lg:pb-16 flex items-center justify-center">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <Portfolio3DProvider>
      <LayoutShell>{children}</LayoutShell>
    </Portfolio3DProvider>
  );
}
