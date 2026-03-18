import { ReactNode } from 'react';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
