import { BoltIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { submitIdea } from './actions/submit-idea';

export function IdeaInput(props: { value?: string }) {
  // const router = useRouter();

  return (
    <form
      action={async (formData) => {
        'use server';
        await submitIdea(formData);
      }}
    >
      <div className="relative">
        <BoltIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
        <Input
          name="idea"
          spellCheck={false}
          className="w-full bg-white shadow-none appearance-none pl-8"
          placeholder="Enter your idea..."
        />
      </div>
      <Button type="submit" className="mt-2">
        Submit Idea
      </Button>
    </form>
  );
}
