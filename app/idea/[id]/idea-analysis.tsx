'use client';

import { SelectIdea } from '@/lib/db';
import { IdeaOutput } from 'app/types';
import { useEffect, useState } from 'react';

interface Props {
  idea?: SelectIdea;
}

export function IdeaAnalysis({ idea }: Props) {
  const [analysis, setAnalysis] = useState<IdeaOutput | null>(null);

  useEffect(() => {
    if (!idea?.idea_analysis) {
      return;
    }

    setAnalysis(JSON.parse(idea.idea_analysis));
  }, [idea]);

  return (
    <div>
      {!idea?.idea_analysis && (
        <div className="text-lg text-gray-500">
          Refresh in a few seconds! We are still generating the idea analysis...
        </div>
      )}

      {idea?.idea_analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Primary Problem</h2>
            <div className="rounded-lg">
              {analysis?.['Idea Analysis']['Primary Problem']}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Target Audience</h2>
            <div className="rounded-lg">
              {analysis?.['Idea Analysis']['Target Audience']}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Unique Selling Proposition</h2>
            <div className="rounded-lg">
              {analysis?.['Idea Analysis']['Unique Selling Proposition']}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Scores</h2>

            <div className="flex rounded-lg bg-gray-100 px-4 py-2 justify-between">
              <div className="">Ease of implementation</div>

              <div className="font-bold">{analysis?.['Idea Scorer'].ease}</div>
            </div>

            <div className="flex rounded-lg bg-gray-100 px-4 py-2 justify-between">
              <div className="">Market Size</div>

              <div className="font-bold">{analysis?.['Idea Scorer'].size}</div>
            </div>

            <div className="flex rounded-lg bg-gray-100 px-4 py-2 justify-between">
              <div className="">Problem Importance</div>

              <div className="font-bold">
                {analysis?.['Idea Scorer'].importance}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <h2 className="text-lg font-bold">Summary</h2>
            <div className="rounded-lg">{analysis?.Summary}</div>
          </div>
        </div>
      )}
    </div>
  );
}
