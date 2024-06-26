'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { SelectIdea } from '@/lib/db';

export function IdeasTable({
  ideas,
  offset
}: {
  ideas: SelectIdea[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Idea</TableHead>
              <TableHead className="">Idea Analysis</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.map((idea) => (
              <IdeaRow key={idea.id} idea={idea} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function IdeaRow({ idea }: { idea: SelectIdea }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{idea.idea}</TableCell>
      <TableCell className="hidden md:table-cell">
        {idea.idea_analysis}
      </TableCell>
    </TableRow>
  );
}
