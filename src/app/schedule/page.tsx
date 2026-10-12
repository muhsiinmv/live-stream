import React from 'react';
import { Metadata } from 'next';
import { Calendar, Clock, Filter, Tv, ExternalLink } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Sports Match Schedule & Fixtures (IST) — IPL, ISL, Cricket, Football',
  description: 'Upcoming sports schedule with Indian Standard Time (IST) fixtures, venues, official broadcaster telecast channels (Star Sports, JioCinema, Sony LIV), and countdown timers.',
};

export default function SchedulePage() {
  const matches = sportsStore.getMatches();
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase mb-3 border border-blue-500/30">
              <Calendar className="w-3.5 h-3.5" />
              <span>Official Indian Standard Time (IST) Fixtures</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              MATCH SCHEDULE & FIXTURES
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Plan your viewing calendar. Verified Indian telecast and digital broadcast listings for IPL, ISL, International Cricket, and European football.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-slate-400 block">Current Clock</span>
            <span className="text-base font-bold text-sky-400 font-mono">IST (UTC+5:30)</span>
          </div>
        </div>
      </div>

      {/* Top Ad Unit */}
      <AdSlot format="leaderboard" slotId="schedule-top" />

      {/* Upcoming Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            CONFIRMED UPCOMING FIXTURES
          </h2>
          <span className="text-xs text-slate-500">{upcomingMatches.length} Fixtures Listed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((m) => (
            <MatchCard key={m.id} match={m} variant="upcoming" />
          ))}
        </div>
      </section>

      {/* Broadcast Guide for Indian Fans */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Tv className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          Indian Sports Telecast Directory & Rights Holders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">JioCinema</span>
            <p className="text-slate-500">TATA IPL 2026, Indian Super League (ISL), BWF Badminton, Olympic Qualifiers.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Star Sports / Disney+ Hotstar</span>
            <p className="text-slate-500">Premier League, ICC World Cups, Pro Kabaddi League, Wimbledon.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Sony LIV / Sony Sports</span>
            <p className="text-slate-500">UEFA Champions League, FA Cup, WWE, Australian Open, Roland Garros.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">FanCode</span>
            <p className="text-slate-500">Carabao Cup, Domestic Cricket, Formula 1 (F1 TV Syndication), Asian Tour.</p>
          </div>
        </div>
      </div>

      <AdSlot format="banner" slotId="schedule-bottom" />
    </div>
  );
}
