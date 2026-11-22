'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import CosmicBackground from './CosmicBackground';
import Horizontal3DStage from './Horizontal3DStage';
import { Portfolio3DProvider, usePortfolio3D } from '@/shared/context/Portfolio3DContext';

interface MainLayoutProps {
  children: ReactNode;
}

function LayoutShell({ children }: MainLayoutProps) {
  const { isDeckRoute } = usePortfolio3D();

  return (
    <div className="flex flex-col h-screen w-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <CosmicBackground />
      <Header />
      <main className="grow relative z-10 flex flex-col overflow-hidden h-full">
        {isDeckRoute ? <Horizontal3DStage /> : <div className="h-full overflow-y-auto pt-20 lg:pt-28 pb-16">{children}</div>}
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
