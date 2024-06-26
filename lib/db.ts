import 'server-only';

import { neon } from '@neondatabase/serverless';
import { desc, eq, ilike } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);

const ideas = pgTable('ideas', {
  id: serial('id').primaryKey(),
  idea: text('idea').notNull(),
  idea_analysis: text('idea_analysis'),
  workflow_id: varchar('workflow_id', { length: 36 }),
  workflow_execution_id: varchar('workflow_execution_id', { length: 36 }),
  created_at: timestamp('created_at').notNull()
});

export type SelectIdea = typeof ideas.$inferSelect;

export async function getIdeas(): Promise<{
  ideas: SelectIdea[];
  newOffset: number | null;
}> {
  return {
    ideas: await db
      .select()
      .from(ideas)
      .orderBy(desc(ideas.created_at))
      .limit(100),
    newOffset: null
  };
}

export async function createIdea(formData: FormData) {
  return db
    .insert(ideas)
    .values({
      idea: formData.get('idea') as string,
      created_at: new Date()
    })
    .returning({ insertedId: ideas.id });
}

export async function getIdea(id: number) {
  const selectedIdeas = await db
    .select()
    .from(ideas)
    .where(eq(ideas.id, id))
    .execute();

  return selectedIdeas[0];
}

export async function updateIdea(id: number, data: Partial<SelectIdea>) {
  return db.update(ideas).set(data).where(eq(ideas.id, id)).execute();
}

export async function getIdeaByWorkflowExecutionId(
  workflowExecutionId: string
) {
  const selectedIdeas = await db
    .select()
    .from(ideas)
    .where(eq(ideas.workflow_execution_id, workflowExecutionId))
    .execute();

  return selectedIdeas[0];
}
