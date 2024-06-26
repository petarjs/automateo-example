import { getIdeaByWorkflowExecutionId, updateIdea } from '@/lib/db';

type IdeaOutput = {
  'Idea Analysis': {
    'Primary Problem': string;
    'Target Audience': string;
    'Unique Selling Proposition': string;
  };

  'Idea Scorer': {
    ease: number;
    size: number;
    importance: number;
  };

  Summary: string;
};

type WorkflowWebhook = {
  workflow_id: string;
  workflow_execution_id: string;
  output: IdeaOutput;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as WorkflowWebhook;

  const idea = await getIdeaByWorkflowExecutionId(
    payload.workflow_execution_id
  );

  console.log('got idea', { idea });

  if (!idea) {
    console.log('idea not found', {
      workflowExecutionId: payload.workflow_execution_id
    });

    return new Response(`Idea not found`, { status: 200 });
  }

  await updateIdea(idea.id, {
    idea_analysis: JSON.stringify(payload.output)
  });

  return new Response('Success!', {
    status: 200
  });
}
