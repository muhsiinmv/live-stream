import React from 'react';
import { Metadata } from 'next';
import { Radio, Filter, Clock, Trophy } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Live Sports Scores & Official Streams Hub — Cricket, IPL, ISL, Football',
  description: 'Live scores, real-time ball-by-ball updates, and official streaming links for ongoing cricket, football, and international matches in Indian Standard Time.',
};

export default function LiveMatchesPage() {
  const matches = sportsStore.getMatches();
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Real-Time Broadcast & Score Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              LIVE SPORTS MATCHES
            </h1>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
              Track live overs, run rates, goals, match minutes, and official licensed stream links. Timezone: Indian Standard Time (IST).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl font-mono text-sm font-bold border border-white/20">
              {liveMatches.length} Active Now
            </span>
          </div>
        </div>
      </div>

      {/* Top Ad Unit */}
      <AdSlot format="leaderboard" slotId="live-page-top" />

      {/* Active Live Matches Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              MATCHES IN PROGRESS
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Auto-Refreshed via Official Data API</span>
        </div>

        {liveMatches.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-40 text-blue-500" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              No matches currently in progress
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Check the upcoming fixtures below for matches scheduled today.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((m) => (
              <MatchCard key={m.id} match={m} variant="live" />
            ))}
          </div>
        )}
      </section>

      {/* Mid Banner */}
      <AdSlot format="banner" slotId="live-page-mid" />

      {/* Upcoming Next in IST */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            STARTING SOON (NEXT 24 HOURS)
          </h2>
          <span className="text-xs font-bold text-blue-600 dark:text-sky-400">Indian Standard Time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.slice(0, 3).map((m) => (
            <MatchCard key={m.id} match={m} variant="upcoming" />
          ))}
        </div>
      </section>
    </div>
  );
}
