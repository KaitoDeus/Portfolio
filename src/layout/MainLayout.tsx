import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      {/* 
        Reserve space for Sidebar.
        Desktop: padding-left. Mobile: padding-bottom.
        The Sidebar defaults to 16px (w-16 = 4rem = 64px).
      */}
      <div className="flex-grow flex flex-col md:pl-16 pb-16 md:pb-0">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
