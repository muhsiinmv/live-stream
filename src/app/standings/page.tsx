import React from 'react';
import { Metadata } from 'next';
import { Trophy, HelpCircle } from 'lucide-react';
import PointsTable from '@/components/PointsTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Tournament Standings & Points Tables — IPL 2026, ISL, Premier League',
  description: 'Updated tournament points tables, standings, Net Run Rate (NRR), goal difference (GD), and qualification scenarios for IPL 2026 and ISL.',
};

export default function StandingsPage() {
  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase mb-3 border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>Official League Tables & Rankings</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            TOURNAMENT STANDINGS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time standings for Indian Premier League, Indian Super League, and European football. Updated after every completed match.
          </p>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="standings-top" />

      {/* Main Points Table component with tabs */}
      <section className="space-y-4">
        <PointsTable initialKey="ipl" showTabs={true} />
      </section>

      {/* Standings Rules & Qualification Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            IPL Playoff Qualification Format
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The top 4 teams at the conclusion of the league phase qualify for the playoffs. <strong>Positions 1 & 2</strong> clash in Qualifier 1 with the winner advancing directly to the Final. <strong>Positions 3 & 4</strong> play the Eliminator. The loser of Qualifier 1 and winner of Eliminator contest Qualifier 2 for the second final spot.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-500" />
            ISL League Shield & Cup Format
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The team finishing top of the league stage is crowned <strong>ISL League Shield Winners</strong> and secures direct qualification to AFC continental competitions. The top 6 teams progress to the ISL Cup playoffs to contest the championship trophy.
          </p>
        </div>
      </div>

      <AdSlot format="banner" slotId="standings-bottom" />
    </div>
  );
}
