'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Radio,
  Play,
  ExternalLink,
  Clock,
  MapPin,
  Bell,
  Check,
  ChevronRight,
  Flame,
  Tv
} from 'lucide-react';
import { Match } from '@/types';

interface MatchCardProps {
  match: Match;
  variant?: 'live' | 'upcoming' | 'compact' | 'standard';
}

export default function MatchCard({ match, variant = 'standard' }: MatchCardProps) {
  const [reminded, setReminded] = useState(false);

  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  const isFinished = match.status === 'finished';

  const handleReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setReminded(!reminded);
  };

  return (
    <div
      className={`group relative bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        isLive
          ? 'border-blue-300 dark:border-blue-900/60 shadow-md shadow-blue-500/5 hover:border-blue-500 hover:shadow-lg'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
      }`}
    >
      {/* Top Card Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/30 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-sky-400 truncate">
            {match.tournament}
          </span>
          {match.matchNumber && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
              • {match.matchNumber}
            </span>
          )}
        </div>

        {/* Status Pill */}
        <div className="shrink-0">
          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-100 text-red-600 dark:bg-red-950/80 dark:text-red-400 border border-red-200 dark:border-red-800">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 animate-pulse" />
              LIVE NOW
            </span>
          )}
          {isUpcoming && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800">
              <Clock className="w-3 h-3 text-slate-500" />
              UPCOMING
            </span>
          )}
          {isFinished && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60">
              FINAL
            </span>
          )}
        </div>
      </div>

      {/* Main Match Info & Teams */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center space-y-3.5">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Team Logo */}
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={match.team1.logo}
                alt={`${match.team1.name} badge`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {match.team1.name}
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {match.team1.shortName}
              </p>
            </div>
          </div>
          {match.team1.score && (
            <span className="text-sm font-black text-slate-900 dark:text-white shrink-0 font-mono tracking-tight">
              {match.team1.score}
            </span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Team Logo */}
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={match.team2.logo}
                alt={`${match.team2.name} badge`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {match.team2.name}
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {match.team2.shortName}
              </p>
            </div>
          </div>
          {match.team2.score && (
            <span className="text-sm font-black text-slate-900 dark:text-white shrink-0 font-mono tracking-tight">
              {match.team2.score}
            </span>
          )}
        </div>

        {/* Status / Match Situation line */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <p className="text-xs font-medium text-blue-700 dark:text-sky-300 leading-snug line-clamp-1">
            {match.statusText}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {match.venue}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="shrink-0">{match.startTimeIST}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3.5 sm:p-4 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        {/* Official Broadcaster Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
          <Tv className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
          <span className="truncate max-w-[110px] sm:max-w-[140px]" title={match.officialBroadcaster.name}>
            {match.officialBroadcaster.name}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {isLive && (
            <>
              <Link
                href={`/watch/${match.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Watch Stream</span>
              </Link>
              <Link
                href={`/live?match=${match.id}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold transition-all"
              >
                Scorecard
              </Link>
            </>
          )}

          {isUpcoming && (
            <>
              <button
                onClick={handleReminder}
                title={reminded ? 'Reminder set for match' : 'Set reminder'}
                className={`p-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  reminded
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-700 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {reminded ? <Check className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
              </button>
              <a
                href={match.officialBroadcaster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 text-blue-600 dark:text-sky-400 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg text-xs font-semibold transition-all"
              >
                <span>Broadcaster</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </>
          )}

          {isFinished && (
            <Link
              href={`/results#${match.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold transition-all"
            >
              Full Result
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
