import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Radio, Calendar, Zap, ShieldCheck } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import PointsTable from '@/components/PointsTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'TATA IPL 2026 Hub — Live Scores, Points Table, Teams, Schedule (IST)',
  description: 'Complete Indian Premier League 2026 coverage: Live scores, CSK, RCB, MI, KKR, points table, playoff race, official streaming on JioCinema & Star Sports.',
};

export default function IplPage() {
  const iplMatches = sportsStore.getMatches().filter((m) => m.tournament.includes('IPL'));
  const liveIpl = iplMatches.filter((m) => m.status === 'live');
  const upcomingIpl = iplMatches.filter((m) => m.status === 'upcoming');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>TATA Indian Premier League 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            IPL 2026 CENTRAL
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 mt-1">
            Follow every ball of the world&apos;s biggest T20 league. Real-time scores, Orange & Purple Cap race, points table, and official streaming info.
          </p>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="ipl-top" />

      {/* Live IPL Matches */}
      {liveIpl.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              LIVE IPL CLASH
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveIpl.map((m) => (
              <MatchCard key={m.id} match={m} variant="live" />
            ))}
          </div>
        </section>
      )}

      {/* IPL Points Table & Upcoming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            IPL 2026 STANDINGS & PLAYOFFS RACE
          </h2>
          <PointsTable initialKey="ipl" showTabs={false} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            NEXT IPL FIXTURES
          </h2>
          <div className="space-y-4">
            {upcomingIpl.map((m) => (
              <MatchCard key={m.id} match={m} variant="upcoming" />
            ))}
          </div>
        </div>
      </div>

      <AdSlot format="banner" slotId="ipl-bottom" />
    </div>
  );
}
