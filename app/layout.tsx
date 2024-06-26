import './globals.css';

import { Logo } from '@/components/icons';
import { getIdeas } from '@/lib/db';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { Nav } from './nav';
import { User } from './user';

export const metadata = {
  title: 'Public Directory of Startup Ideas - Automateo Example',
  description:
    'A public directory of startup ideas to help you get inspired and start building. Created by Automateo.app.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { ideas, newOffset } = await getIdeas();

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  <span className="">Automateo Example</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <Nav ideas={ideas} />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold lg:hidden"
                href="/"
              >
                <Logo />
                <span className="">Automateo Example</span>
              </Link>
              <User />
            </header>
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
