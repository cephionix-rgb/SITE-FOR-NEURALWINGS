import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full relative z-[1]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
