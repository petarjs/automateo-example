export const dynamic = 'force-dynamic';

import { getIdea } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function IdeaPage({
  params: { id }
}: {
  params: { id: string };
}) {
  const idea = await getIdea(Number(id));

  if (!idea) {
    redirect('/');
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">{idea.idea}</h1>

        {!idea.idea_analysis && (
          <div className="text-lg text-gray-500">
            We are still generating the idea analysis...
          </div>
        )}

        {idea.idea_analysis && (
          <div className="text-lg">{idea.idea_analysis}</div>
        )}
      </div>
    </main>
  );
}
