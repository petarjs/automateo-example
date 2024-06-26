import { auth } from '@/lib/auth';
import { IdeaInput } from './idea-input';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await auth();

  return (
    <div className="container max-w-6xl mx-auto">
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">
            Public Directory of Startup Ideas
          </h1>
        </div>
        {!session?.user && (
          <div className="mb-4 text-sm text-gray-500">
            You need to be signed in to view startup ideas.
          </div>
        )}

        {session?.user && (
          <>
            <div className="w-full mb-4">
              <IdeaInput />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
