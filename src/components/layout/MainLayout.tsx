'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CosmicBackground from './CosmicBackground';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <CosmicBackground />
      <Header />
      <main className="grow relative z-10 pt-20 lg:pt-28 pb-24 lg:pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
