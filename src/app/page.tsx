import React from 'react';
import Link from 'next/link';
import {
  Play,
  Calendar,
  Radio,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tv,
  Newspaper,
  Flame,
  ChevronRight,
  Clock
} from 'lucide-react';
import { sportsStore } from '@/lib/store';
import MatchCard from '@/components/MatchCard';
import AdSlot from '@/components/AdSlot';
import PointsTable from '@/components/PointsTable';

export default function HomePage() {
  const allMatches = sportsStore.getMatches();
  const allNews = sportsStore.getNews();

  const liveMatches = allMatches.filter((m) => m.status === 'live');
  const upcomingMatches = allMatches.filter((m) => m.status === 'upcoming');
  const featuredNews = allNews.slice(0, 3);

  return (
    <div className="space-y-10 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
              <span>India&apos;s Sports Broadcasting Hub</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1] mb-5">
              YOUR SPORTS.{' '}
              <span className="text-blue-600 dark:text-sky-400">YOUR PASSION.</span>{' '}
              LIVE.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Follow every match with real-time live scores, match updates, schedules, statistics, and official authorized streaming links.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/live"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-102"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Explore Live Matches ({liveMatches.length})</span>
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <span>Match Schedule (IST)</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">100% Authorized</p>
                <p className="text-[11px] text-slate-500">Official legal streams only</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Real-Time IST Scores</p>
                <p className="text-[11px] text-slate-500">Ball-by-ball updates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">IPL & ISL Hub</p>
                <p className="text-[11px] text-slate-500">Points tables & stats</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Broadcaster Guides</p>
                <p className="text-[11px] text-slate-500">JioCinema, Star Sports, Sony</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP ADSENSE BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot format="leaderboard" slotId="home-top-leaderboard" />
      </div>

      {/* 2. LIVE NOW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              LIVE NOW
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              {liveMatches.length} In Progress
            </span>
          </div>

          <Link
            href="/live"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-sky-400 hover:underline"
          >
            <span>View All Live Hub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {liveMatches.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No matches currently in progress</p>
            <p className="text-xs text-slate-400 mt-1">Check the upcoming schedule below for matches starting today in IST.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} variant="live" />
            ))}
          </div>
        )}
      </section>

      {/* 3. MID-CONTENT ADSENSE BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot format="banner" slotId="home-mid-content" />
      </div>

      {/* 4. UPCOMING MATCHES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              UPCOMING FIXTURES (IST)
            </h2>
          </div>

          <Link
            href="/schedule"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-sky-400 hover:underline"
          >
            <span>Full Fixtures Calendar</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.slice(0, 3).map((match) => (
            <MatchCard key={match.id} match={match} variant="upcoming" />
          ))}
        </div>
      </section>

      {/* 5. SPORTS CATEGORIES TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            SPORTS CATEGORIES
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dedicated hubs for India&apos;s favourite sporting tournaments and international leagues
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { name: 'IPL 2026', href: '/ipl', tag: 'Cricket', color: 'from-amber-500 to-orange-600', icon: Trophy },
            { name: 'ISL Football', href: '/isl', tag: 'Football', color: 'from-emerald-500 to-teal-700', icon: Flame },
            { name: 'Team India', href: '/cricket', tag: 'Cricket', color: 'from-blue-600 to-indigo-700', icon: Zap },
            { name: 'Premier League', href: '/football', tag: 'Football', color: 'from-purple-600 to-indigo-800', icon: Trophy },
            { name: 'Badminton BWF', href: '/schedule', tag: 'Racket', color: 'from-rose-500 to-pink-600', icon: Zap },
            { name: 'Standings', href: '/standings', tag: 'Tables', color: 'from-slate-700 to-slate-900', icon: Trophy },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 overflow-hidden"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {cat.tag}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. TOURNAMENT STANDINGS PREVIEW & LATEST NEWS DUAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Points Table (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                TOURNAMENT STANDINGS
              </h2>
              <Link
                href="/standings"
                className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline"
              >
                Full Standings →
              </Link>
            </div>
            <PointsTable initialKey="ipl" showTabs={true} />
          </div>

          {/* Right: Latest Sports News & Analysis (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600 dark:text-sky-400" />
                ORIGINAL SPORTS NEWS
              </h2>
              <Link
                href="/news"
                className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline"
              >
                All Articles →
              </Link>
            </div>

            <div className="space-y-4">
              {featuredNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group block p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900/60 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-600 dark:text-sky-400 mb-1.5">
                    <span className="uppercase tracking-wider">{article.category}</span>
                    <span>•</span>
                    <span className="text-slate-400 font-normal">{article.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
                    <span>By {article.author.name}</span>
                    <span className="text-blue-600 dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Read Analysis <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. OFFICIAL BROADCAST COMPLIANCE & SAFETY NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SPORTWAVE LIVE Broadcaster Commitment</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
              Authorized Streams, Genuine Fan Safety, and Fair Rights
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              We never promote, host, or scrape unauthorized streams or pirated video feeds. SPORTWAVE LIVE exclusively connects sports fans in India to verified broadcast platforms including <strong>JioCinema, Star Sports / Disney+ Hotstar, Sony LIV, and FanCode</strong>. Our mission is to keep sports streaming clean, secure, and respectful of intellectual property.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline"
              >
                Read Our Broadcasting Standards →
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/copyright-policy"
                className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline"
              >
                DMCA & Content Removal Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
