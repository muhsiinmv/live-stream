import React from 'react';
import { Metadata } from 'next';
import { Trophy, CheckCircle, Clock } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Match Results & Final Scorecards — IPL, ISL, Cricket, Football',
  description: 'Verified sports match results, final scorecards, player of the match awards, and summary reports for completed matches.',
};

export default function ResultsPage() {
  const matches = sportsStore.getMatches();
  const finishedMatches = matches.filter((m) => m.status === 'finished');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-3 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Completed Match Records</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              MATCH RESULTS & SCORECARDS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Official final scores, margins of victory, Player of the Match awards, and statistical summaries.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300 border border-slate-700">
            {finishedMatches.length} Recorded Results
          </span>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="results-top" />

      {/* Grid of Results */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
          RECENT COMPLETED FIXTURES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finishedMatches.map((m) => (
            <MatchCard key={m.id} match={m} variant="standard" />
          ))}
        </div>
      </section>

      <AdSlot format="banner" slotId="results-bottom" />
    </div>
  );
}
