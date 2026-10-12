'use client';

import React from 'react';
import { CricketScoreDetails } from '@/types';

interface CricketScorecardProps {
  details: CricketScoreDetails;
}

export default function CricketScorecard({ details }: CricketScorecardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {details.currentInnings}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Partnership: <span className="font-semibold text-slate-800 dark:text-slate-200">{details.partnership}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-slate-400 text-[10px] uppercase block">Current RR</span>
            <span className="font-bold text-blue-600 dark:text-sky-400 text-sm">{details.runRate.toFixed(2)}</span>
          </div>
          {details.requiredRunRate && (
            <div className="text-right pl-3 border-l border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 text-[10px] uppercase block">Req. RR</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{details.requiredRunRate.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Balls Tracker */}
      <div className="px-4 py-3 bg-blue-50/40 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs">
        <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider shrink-0">
          Recent Balls:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {details.lastBalls.map((ball, idx) => {
            const isFour = ball === '4';
            const isSix = ball === '6';
            const isWicket = ball.toLowerCase().includes('w');

            return (
              <span
                key={idx}
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  isFour
                    ? 'bg-blue-600 text-white'
                    : isSix
                    ? 'bg-emerald-600 text-white'
                    : isWicket
                    ? 'bg-red-600 text-white animate-bounce'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {ball}
              </span>
            );
          })}
        </div>
      </div>

      {/* Batsmen Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-4">Batter</th>
              <th className="py-2.5 px-3 text-right">R</th>
              <th className="py-2.5 px-3 text-right">B</th>
              <th className="py-2.5 px-3 text-right">4s</th>
              <th className="py-2.5 px-3 text-right">6s</th>
              <th className="py-2.5 px-4 text-right">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {details.batsmen.map((b) => (
              <tr
                key={b.name}
                className={b.isNotOut ? 'bg-blue-50/30 dark:bg-blue-950/20 font-medium' : 'text-slate-600 dark:text-slate-400'}
              >
                <td className="py-2.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 dark:text-white">{b.name}</span>
                    {b.isNotOut && <span className="text-blue-600 dark:text-sky-400 font-bold">*</span>}
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white font-mono">{b.runs}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-500">{b.balls}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-500">{b.fours}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-500">{b.sixes}</td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                  {b.strikeRate.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bowlers Table */}
      <div className="overflow-x-auto border-t border-slate-200 dark:border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-4">Bowler</th>
              <th className="py-2.5 px-3 text-right">O</th>
              <th className="py-2.5 px-3 text-right">M</th>
              <th className="py-2.5 px-3 text-right">R</th>
              <th className="py-2.5 px-3 text-right">W</th>
              <th className="py-2.5 px-4 text-right">Econ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {details.bowlers.map((bw) => (
              <tr key={bw.name} className="text-slate-700 dark:text-slate-300">
                <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">{bw.name}</td>
                <td className="py-2.5 px-3 text-right font-mono">{bw.overs.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-500">{bw.maidens}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-500">{bw.runs}</td>
                <td className="py-2.5 px-3 text-right font-bold text-blue-600 dark:text-sky-400 font-mono">{bw.wickets}</td>
                <td className="py-2.5 px-4 text-right font-mono">{bw.economy.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
