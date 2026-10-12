'use client';

import React from 'react';
import { FootballScoreDetails } from '@/types';
import { Flame, Shield, ArrowRightLeft } from 'lucide-react';

interface FootballScorecardProps {
  details: FootballScoreDetails;
  team1Name: string;
  team2Name: string;
}

export default function FootballScorecard({ details, team1Name, team2Name }: FootballScorecardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 p-5">
      {/* Header status */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            {details.half} ({details.minute}&apos;)
          </span>
        </div>
        <span className="text-xs font-mono font-medium text-slate-500">Live Match Statistics</span>
      </div>

      {/* Possession Bar */}
      <div>
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-blue-600 dark:text-sky-400">{details.possession.team1}% {team1Name}</span>
          <span className="text-slate-500 font-normal">Possession</span>
          <span className="text-amber-600 dark:text-amber-400">{details.possession.team2}% {team2Name}</span>
        </div>
        <div className="w-full h-2.5 bg-amber-500 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${details.possession.team1}%` }}
          />
        </div>
      </div>

      {/* Shots on Target */}
      <div>
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-800 dark:text-slate-200 font-mono">{details.shotsOnTarget.team1}</span>
          <span className="text-slate-500 font-normal">Shots on Target</span>
          <span className="text-slate-800 dark:text-slate-200 font-mono">{details.shotsOnTarget.team2}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${(details.shotsOnTarget.team1 / (details.shotsOnTarget.team1 + details.shotsOnTarget.team2 || 1)) * 100}%`
            }}
          />
          <div
            className="h-full bg-amber-500"
            style={{
              width: `${(details.shotsOnTarget.team2 / (details.shotsOnTarget.team1 + details.shotsOnTarget.team2 || 1)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Corners */}
      <div>
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-800 dark:text-slate-200 font-mono">{details.corners.team1}</span>
          <span className="text-slate-500 font-normal">Corners Won</span>
          <span className="text-slate-800 dark:text-slate-200 font-mono">{details.corners.team2}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${(details.corners.team1 / (details.corners.team1 + details.corners.team2 || 1)) * 100}%`
            }}
          />
          <div
            className="h-full bg-amber-500"
            style={{
              width: `${(details.corners.team2 / (details.corners.team1 + details.corners.team2 || 1)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Match Events Timeline */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Key Match Events
        </h4>
        <div className="space-y-2">
          {details.events.map((evt, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-500 w-8">{evt.minute}&apos;</span>
                {evt.type === 'goal' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    ⚽ GOAL
                  </span>
                )}
                {evt.type === 'yellow_card' && (
                  <span className="w-3.5 h-4.5 rounded-xs bg-amber-400 inline-block shadow-xs" title="Yellow Card" />
                )}
                {evt.type === 'red_card' && (
                  <span className="w-3.5 h-4.5 rounded-xs bg-red-600 inline-block shadow-xs" title="Red Card" />
                )}
                <span className="font-semibold text-slate-900 dark:text-slate-100">{evt.player}</span>
              </div>
              <span className="text-slate-500 text-[11px] font-medium">{evt.team}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
