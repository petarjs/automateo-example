import { Input } from '@/components/ui/input';
import { BoltIcon, SearchIcon, Spinner } from '@/components/icons';
// import { useRouter } from 'next/navigation';

import { submitIdea } from './actions/submit-idea';

export function IdeaInput(props: { value?: string }) {
  // const router = useRouter();

  return (
    <div className="relative">
      <form
        action={async (formData) => {
          'use server';
          await submitIdea(formData);
        }}
      >
        <BoltIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
        <Input
          name="idea"
          spellCheck={false}
          className="w-full bg-white shadow-none appearance-none pl-8"
          placeholder="Enter your idea..."
        />
      </form>
    </div>
  );
}
