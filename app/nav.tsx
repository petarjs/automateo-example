'use client';

import { BoltIcon, LinkOutIcon } from '@/components/icons';
import { SelectIdea } from '@/lib/db';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-item';

export function Nav({ ideas }: { ideas: SelectIdea[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex-col items-start px-4 text-sm font-medium">
      <NavItem href="/">
        <BoltIcon className="h-4 w-4" />
        Submit Startup Idea
      </NavItem>

      <NavItem href="https://automateo.app" target="_blank">
        <LinkOutIcon className="h-4 w-4" />
        Automateo.app
      </NavItem>

      <div className="flex-1 p-2 text-xs font-medium text-gray-500">
        Displaying last 100 ideas
      </div>

      {ideas.map((idea) => (
        <NavItem key={idea.id} href={`/idea/${idea.id}`}>
          <div className="truncate block max-w-full">💡 {idea.idea}</div>
        </NavItem>
      ))}
    </nav>
  );
}
