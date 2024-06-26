export const dynamic = 'force-dynamic';

import { getIdea } from '@/lib/db';
import { redirect } from 'next/navigation';
import { IdeaAnalysis } from './idea-analysis';

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
    <div className="container max-w-6xl mx-auto">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="bg-yellow-100 rounded-2xl p-4 font-medium text-lg md:text-2xl">
            💡 {idea.idea}
          </h1>

          <IdeaAnalysis idea={idea} />
        </div>
      </main>
    </div>
  );
}
