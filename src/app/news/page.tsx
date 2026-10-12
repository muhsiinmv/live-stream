import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ChevronRight, Clock, User, Tag } from 'lucide-react';
import { sportsStore } from '@/lib/store';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Sports News, Match Previews, Tactical Debriefs & Indian Sports Analysis',
  description: 'Original sports journalism: IPL tactical analysis, ISL match reports, Border-Gavaskar Trophy updates, badminton insights, and verified telecast information.',
};

export default function NewsIndexPage() {
  const articles = sportsStore.getNews();

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase mb-3 border border-blue-500/30">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Sportwave Live Editorial Newsroom</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            SPORTS NEWS & EDITORIAL ANALYSIS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            In-depth match previews, tactical breakdowns, player spotlights, and tournament analysis curated for Indian sports fans.
          </p>
        </div>
      </div>

      <AdSlot format="leaderboard" slotId="news-top" />

      {/* Featured Lead Article */}
      {articles[0] && (
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-blue-400 transition-all group">
          <Link href={`/news/${articles[0].slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-sky-400 uppercase">
                <span>{articles[0].category}</span>
                <span>•</span>
                <span className="text-slate-400 font-normal">{articles[0].readTime}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                {articles[0].title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {articles[0].excerpt}
              </p>
              <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{articles[0].author.name}</span>
                  <span>•</span>
                  <span>{articles[0].publishedAt}</span>
                </div>
                <span className="text-blue-600 dark:text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read In Full <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={articles[0].imageUrl}
                alt={articles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        </section>
      )}

      {/* Grid of Remaining Articles */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
          LATEST SPORTS ARTICLES & REPORTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900/60 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-white">
                  {article.category}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{article.author.name}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot format="banner" slotId="news-bottom" />
    </div>
  );
}
