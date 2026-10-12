'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Trophy, Newspaper, ArrowRight, Radio } from 'lucide-react';
import Link from 'next/link';
import { Match, NewsArticle } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  news: NewsArticle[];
}

export default function SearchModal({ isOpen, onClose, matches, news }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMatches = query.trim()
    ? matches.filter(
        (m) =>
          m.team1.name.toLowerCase().includes(query.toLowerCase()) ||
          m.team2.name.toLowerCase().includes(query.toLowerCase()) ||
          m.team1.shortName.toLowerCase().includes(query.toLowerCase()) ||
          m.team2.shortName.toLowerCase().includes(query.toLowerCase()) ||
          m.tournament.toLowerCase().includes(query.toLowerCase()) ||
          m.venue.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredNews = query.trim()
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.category.toLowerCase().includes(query.toLowerCase()) ||
          n.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search matches (RCB, CSK, ISL), tournaments, teams, or sports news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden text-sm md:text-base font-normal"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500">
              <Trophy className="w-10 h-10 mx-auto mb-2 opacity-40 text-blue-500" />
              <p className="text-sm font-medium">Type a team name, tournament, or sport to search</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['RCB vs CSK', 'Mohun Bagan', 'IPL 2026', 'Virat Kohli', 'ISL', 'Premier League'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 rounded-full transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Matches Results */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  Matches ({filteredMatches.length})
                </h4>
                {filteredMatches.length === 0 ? (
                  <p className="text-xs text-slate-400 py-1">No matches matching &quot;{query}&quot;</p>
                ) : (
                  <div className="space-y-2">
                    {filteredMatches.map((m) => (
                      <Link
                        key={m.id}
                        href={m.status === 'live' ? `/watch/${m.id}` : `/live?match=${m.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          {m.status === 'live' ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800/50">
                              <Radio className="w-3 h-3 animate-pulse" />
                              LIVE
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                              {m.status.toUpperCase()}
                            </span>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
                              {m.team1.shortName} vs {m.team2.shortName}
                            </p>
                            <p className="text-xs text-slate-500">{m.tournament} • {m.startTimeIST}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* News Articles Results */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" />
                  Sports News & Analysis ({filteredNews.length})
                </h4>
                {filteredNews.length === 0 ? (
                  <p className="text-xs text-slate-400 py-1">No articles matching &quot;{query}&quot;</p>
                ) : (
                  <div className="space-y-2">
                    {filteredNews.map((n) => (
                      <Link
                        key={n.id}
                        href={`/news/${n.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-200 transition-all group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500">{n.category} • {n.readTime}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
