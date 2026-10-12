'use client';

import React, { useState } from 'react';
import { CommentaryItem } from '@/types';
import { Filter, MessageSquare, Radio } from 'lucide-react';

interface LiveCommentaryProps {
  items: CommentaryItem[];
}

export default function LiveCommentary({ items }: LiveCommentaryProps) {
  const [filter, setFilter] = useState<'all' | 'key'>('all');

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.type === 'wicket' || item.type === 'boundary' || item.type === 'goal' || item.type === 'card';
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Header & Filter Controls */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Live Text Commentary
          </h3>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse ml-1" />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Balls / Updates
          </button>
          <button
            onClick={() => setFilter('key')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              filter === 'key'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Key Highlights
          </button>
        </div>
      </div>

      {/* Commentary Items Feed */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[500px] overflow-y-auto">
        {filteredItems.map((c) => {
          const isBoundary = c.type === 'boundary';
          const isWicket = c.type === 'wicket';
          const isGoal = c.type === 'goal';

          return (
            <div
              key={c.id}
              className={`p-4 transition-colors ${
                isBoundary
                  ? 'bg-blue-50/20 dark:bg-blue-950/10'
                  : isWicket || isGoal
                  ? 'bg-red-50/25 dark:bg-red-950/10'
                  : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded shrink-0">
                  {c.timeOrOver}
                </span>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {c.headline}
                    </h4>
                    {isBoundary && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        BOUNDARY
                      </span>
                    )}
                    {isWicket && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse">
                        WICKET
                      </span>
                    )}
                    {isGoal && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        GOAL
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
