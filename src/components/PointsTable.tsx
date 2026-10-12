'use client';

import React, { useState } from 'react';
import { TournamentStandings } from '@/types';
import { STANDINGS_DATA } from '@/lib/sportsData';
import { Trophy } from 'lucide-react';

interface PointsTableProps {
  initialKey?: 'ipl' | 'isl' | 'premier_league';
  showTabs?: boolean;
}

export default function PointsTable({ initialKey = 'ipl', showTabs = true }: PointsTableProps) {
  const [activeKey, setActiveKey] = useState<'ipl' | 'isl' | 'premier_league'>(initialKey);

  const standings: TournamentStandings = STANDINGS_DATA[activeKey] || STANDINGS_DATA.ipl;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Header with tournament tabs */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {standings.tournament}
          </h3>
          <span className="text-xs text-slate-400 font-mono">({standings.season})</span>
        </div>

        {showTabs && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'ipl', label: 'TATA IPL' },
              { id: 'isl', label: 'Indian Super League' },
              { id: 'premier_league', label: 'Premier League' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveKey(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeKey === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-3 text-center w-10">Pos</th>
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-3 text-center">P</th>
              <th className="py-3 px-3 text-center">W</th>
              <th className="py-3 px-3 text-center">
                {activeKey === 'ipl' ? 'L' : 'D'}
              </th>
              <th className="py-3 px-3 text-center">
                {activeKey === 'ipl' ? 'NR' : 'L'}
              </th>
              <th className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">Pts</th>
              <th className="py-3 px-3 text-right">
                {activeKey === 'ipl' ? 'NRR' : 'GD'}
              </th>
              <th className="py-3 px-4 text-center hidden md:table-cell">Recent Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {standings.rows.map((row) => {
              const isTopFour = row.position <= 4;

              return (
                <tr
                  key={row.position}
                  className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors ${
                    isTopFour ? 'bg-blue-50/15 dark:bg-blue-950/10' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-center font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] ${
                        row.position <= 2
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-black'
                          : row.position <= 4
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {row.position}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={row.logo} alt={row.team} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-none">
                        {row.team}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-300">{row.played}</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-300">{row.won}</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-500">
                    {activeKey === 'ipl' ? row.lost : row.drawnOrNR}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-500">
                    {activeKey === 'ipl' ? row.drawnOrNR : row.lost}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-black text-blue-600 dark:text-sky-400 text-sm">
                    {row.points}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {row.netRunRateOrGD}
                  </td>
                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      {row.form.map((f, i) => (
                        <span
                          key={i}
                          className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center ${
                            f === 'W'
                              ? 'bg-emerald-600 text-white'
                              : f === 'L'
                              ? 'bg-red-500 text-white'
                              : 'bg-slate-400 text-white'
                          }`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend footnote */}
      <div className="p-3 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Top 2: Qualifier 1 / Direct Knockout •
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block ml-1" /> Top 4: Playoffs
        </span>
        <span className="font-mono">Updated post Match 34</span>
      </div>
    </div>
  );
}
