import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Flame, Trophy, Newspaper } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import PointsTable from '@/components/PointsTable';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Football Live Scores, ISL 2025-26, Premier League & Broadcast Guides',
  description: 'Indian and international football hub: Live ISL scores, Mohun Bagan, Mumbai City, Premier League, UEFA Champions League, and official telecast partners.',
};

export default function FootballPage() {
  const matches = sportsStore.getMatches().filter((m) => m.sport === 'football');
  const liveFootball = matches.filter((m) => m.status === 'live');
  const upcomingFootball = matches.filter((m) => m.status === 'upcoming');
  const footballNews = sportsStore.getNews().filter((n) => n.sport === 'football');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>ISL & World Football Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            FOOTBALL LIVE HUB
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Indian Super League (ISL), Premier League, UEFA Champions League live scores, standings, and broadcaster links for Indian fans.
          </p>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="football-top" />

      {/* Live Football Matches */}
      {liveFootball.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              LIVE FOOTBALL MATCHES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveFootball.map((m) => (
              <MatchCard key={m.id} match={m} variant="live" />
            ))}
          </div>
        </section>
      )}

      {/* ISL Standings & Upcoming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            INDIAN SUPER LEAGUE (ISL) STANDINGS
          </h2>
          <PointsTable initialKey="isl" showTabs={false} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            UPCOMING FOOTBALL FIXTURES (IST)
          </h2>
          <div className="space-y-4">
            {upcomingFootball.map((m) => (
              <MatchCard key={m.id} match={m} variant="upcoming" />
            ))}
          </div>
        </div>
      </div>

      <AdSlot format="banner" slotId="football-mid" />

      {/* Football News */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-emerald-500" />
          FOOTBALL REPORTS & MATCH PREVIEWS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {footballNews.map((n) => (
            <Link
              key={n.id}
              href={`/news/${n.slug}`}
              className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
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
