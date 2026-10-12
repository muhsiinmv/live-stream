import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Radio, Calendar, Newspaper } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import PointsTable from '@/components/PointsTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Live Cricket Scores, IPL 2026, Team India Fixtures & Scorecards',
  description: 'Complete cricket coverage for Indian fans: Live scores, IPL 2026, Border-Gavaskar Trophy, ICC fixtures, ball-by-ball commentary, and official stream links.',
};

export default function CricketPage() {
  const matches = sportsStore.getMatches().filter((m) => m.sport === 'cricket');
  const liveCricket = matches.filter((m) => m.status === 'live');
  const upcomingCricket = matches.filter((m) => m.status === 'upcoming');
  const cricketNews = sportsStore.getNews().filter((n) => n.sport === 'cricket');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-sky-200 text-xs font-bold uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Indian & International Cricket Central</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            CRICKET LIVE HUB
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Follow TATA IPL 2026, Team India Test matches, ODIs, T20 Internationals, points tables, and live scorecards.
          </p>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="cricket-top" />

      {/* Live Cricket */}
      {liveCricket.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              LIVE CRICKET ACTION
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveCricket.map((m) => (
              <MatchCard key={m.id} match={m} variant="live" />
            ))}
          </div>
        </section>
      )}

      {/* IPL Points Table & Upcoming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            TATA IPL 2026 POINTS TABLE
          </h2>
          <PointsTable initialKey="ipl" showTabs={false} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            UPCOMING CRICKET FIXTURES (IST)
          </h2>
          <div className="space-y-4">
            {upcomingCricket.map((m) => (
              <MatchCard key={m.id} match={m} variant="upcoming" />
            ))}
          </div>
        </div>
      </div>

      <AdSlot format="banner" slotId="cricket-mid" />

      {/* Cricket News */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-blue-600 dark:text-sky-400" />
          CRICKET ARTICLES & TACTICAL ANALYSIS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cricketNews.map((n) => (
            <Link
              key={n.id}
              href={`/news/${n.slug}`}
              className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-sky-400">
                  {n.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                  {n.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                  {n.excerpt}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{n.author.name}</span>
                <span>{n.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
