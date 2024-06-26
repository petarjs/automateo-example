import { createIdea, updateIdea } from '@/lib/db';
import { redirect } from 'next/navigation';

type WorkflowExecution = {
  id: string;
  workflow_id: string;
};

export async function submitIdea(formData: FormData) {
  const [{ insertedId }] = await createIdea(formData);

  const response = await fetch(
    'https://api.automateo.app/api/w/2a84cf35-b501-4946-8482-713af7b392bc',
    {
      method: 'POST',
      body: JSON.stringify({ input: formData.get('idea') }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTOMATEO_API_KEY}`
      }
    }
  );

  const json = (await response.json()) as { data: WorkflowExecution };

  await updateIdea(insertedId, {
    workflow_id: json.data.workflow_id,
    workflow_execution_id: json.data.id
  });

  redirect(`/idea/${insertedId}`);
}
