import React from 'react';
import { Metadata } from 'next';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import PointsTable from '@/components/PointsTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Indian Super League (ISL 2025-26) Hub — Live Scores, Points Table & Fixtures',
  description: 'Indian Super League coverage: Mohun Bagan, Mumbai City, Kerala Blasters, Bengaluru FC live scores, semi-finals, fixtures, and JioCinema/Sports18 official streams.',
};

export default function IslPage() {
  const islMatches = sportsStore.getMatches().filter((m) => m.tournament.includes('ISL') || m.tournament.includes('Indian Super League'));
  const liveIsl = islMatches.filter((m) => m.status === 'live');
  const upcomingIsl = islMatches.filter((m) => m.status === 'upcoming');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>Indian Super League 2025-26</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            ISL CENTRAL
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 mt-1">
            Top flight of Indian football. Live scores, semi-final knockout brackets, league table, and official telecast guides.
          </p>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="isl-top" />

      {/* Live ISL Matches */}
      {liveIsl.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              LIVE ISL ACTION
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveIsl.map((m) => (
              <MatchCard key={m.id} match={m} variant="live" />
            ))}
          </div>
        </section>
      )}

      {/* ISL Table & Upcoming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            ISL 2025-26 LEAGUE STANDINGS
          </h2>
          <PointsTable initialKey="isl" showTabs={false} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            NEXT ISL MATCHES
          </h2>
          <div className="space-y-4">
            {upcomingIsl.map((m) => (
              <MatchCard key={m.id} match={m} variant="upcoming" />
            ))}
          </div>
        </div>
      </div>

      <AdSlot format="banner" slotId="isl-bottom" />
    </div>
  );
}
