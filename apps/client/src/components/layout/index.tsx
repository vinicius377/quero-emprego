import type { ReactNode } from 'react';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="fixed top-0 z-10 w-full">
        <Header />
      </div>
      <main className="min-h-screen pt-10 mt-2 px-2 bg-[#fafafa]">
        <div className="max-w-[70rem] m-auto ">{children}</div>
      </main>
    </div>
  );
}
