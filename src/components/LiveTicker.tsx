'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, ChevronRight } from 'lucide-react';
import { Match } from '@/types';

interface LiveTickerProps {
  matches: Match[];
}

export default function LiveTicker({ matches }: LiveTickerProps) {
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');
  const displayMatches = [...liveMatches, ...upcomingMatches.slice(0, 3)];

  if (displayMatches.length === 0) return null;

  return (
    <div className="bg-slate-100/90 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Label */}
          <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-slate-200 dark:border-slate-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-xs font-black tracking-wider text-slate-800 dark:text-slate-100 uppercase">
              SCORES
            </span>
          </div>

          {/* Scrolling / Overflow Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
            {displayMatches.map((match) => (
              <Link
                key={match.id}
                href={match.status === 'live' ? `/watch/${match.id}` : `/live?match=${match.id}`}
                className="shrink-0 flex items-center gap-2.5 px-3 py-1 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700/60 hover:border-blue-400 hover:shadow-xs transition-all text-xs group"
              >
                <span className="font-bold text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {match.tournament.split(' ')[0]}
                </span>

                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <span>{match.team1.shortName}</span>
                  {match.team1.score && (
                    <span className="text-blue-600 dark:text-sky-400 font-bold">{match.team1.score.split(' ')[0]}</span>
                  )}
                  <span className="text-slate-400 text-[10px]">vs</span>
                  <span>{match.team2.shortName}</span>
                  {match.team2.score && (
                    <span className="text-slate-600 dark:text-slate-300 font-bold">{match.team2.score.split(' ')[0]}</span>
                  )}
                </div>

                {match.status === 'live' ? (
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-1.5 py-0.2 rounded-full border border-red-200 dark:border-red-800">
                    LIVE
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-500">
                    {match.startTimeIST.includes('Today') ? 'Today' : match.startTimeIST.split(',')[0]}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* View All link */}
          <Link
            href="/live"
            className="hidden sm:flex items-center gap-0.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline shrink-0 ml-auto"
          >
            <span>All Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
