'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Plus,
  Edit,
  Trash2,
  Tv,
  CheckCircle,
  AlertCircle,
  Radio,
  FileText,
  DollarSign,
  Settings,
  RefreshCw,
  ExternalLink,
  Save,
  Eye
} from 'lucide-react';
import { Match, NewsArticle, SiteSettings } from '@/types';
import { getTeamBadgeSvg } from '@/lib/sportsData';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'matches' | 'news' | 'adsense' | 'settings'>('overview');

  // State
  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'SPORTWAVE LIVE',
    siteTagline: 'Your Sports. Your Passion. Live.',
    adsenseEnabled: true,
    adsensePublisherId: 'ca-pub-9842109842109842',
    adsenseTestMode: true,
    adminPin: '1234',
    contactEmail: 'contact@sportwavelive.in',
    dataApiStatus: 'operational',
    autoRefreshIntervalSeconds: 15,
    attributionText: 'Official match data & broadcasts attributed to licensed partners and tournament syndicates.'
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Edit/Create match modal state
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Partial<Match> | null>(null);

  // Quick Score updater state
  const [quickScoreMatchId, setQuickScoreMatchId] = useState<string | null>(null);
  const [quickScore1, setQuickScore1] = useState('');
  const [quickScore2, setQuickScore2] = useState('');
  const [quickStatusText, setQuickStatusText] = useState('');

  // Fetch initial data
  const fetchData = async () => {
    try {
      const matchRes = await fetch('/api/matches');
      const matchData = await matchRes.json();
      if (matchData.matches) setMatches(matchData.matches);

      const newsRes = await fetch('/api/news');
      const newsData = await newsRes.json();
      if (newsData.news) setNews(newsData.news);

      const setRes = await fetch('/api/settings');
      const setData = await setRes.json();
      if (setData.settings) setSettings(setData.settings);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Auth handle
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === settings.adminPin) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Administrator PIN. (Default test PIN is 1234)');
    }
  };

  // Status toggle
  const handleStatusChange = async (matchId: string, newStatus: 'live' | 'upcoming' | 'finished') => {
    const target = matches.find((m) => m.id === matchId);
    if (!target) return;

    try {
      const res = await fetch(`/api/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setMatches(matches.map((m) => (m.id === matchId ? { ...m, status: newStatus } : m)));
        showNotify(`Status updated to ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Quick score save
  const handleSaveQuickScore = async (matchId: string) => {
    try {
      const updatePayload: any = {};
      if (quickScore1) updatePayload.team1 = { ...matches.find((m) => m.id === matchId)?.team1, score: quickScore1 };
      if (quickScore2) updatePayload.team2 = { ...matches.find((m) => m.id === matchId)?.team2, score: quickScore2 };
      if (quickStatusText) updatePayload.statusText = quickStatusText;

      const res = await fetch(`/api/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });
      const data = await res.json();
      if (data.success) {
        await fetchData();
        setQuickScoreMatchId(null);
        showNotify('Live score updated successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save new / edited match
  const handleSaveMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch?.team1?.name || !editingMatch?.team2?.name) return;

    const matchToSave: Match = {
      id: editingMatch.id || `match-${Date.now()}`,
      sport: editingMatch.sport || 'cricket',
      tournament: editingMatch.tournament || 'TATA IPL 2026',
      matchNumber: editingMatch.matchNumber || 'Match',
      team1: {
        name: editingMatch.team1.name,
        shortName: editingMatch.team1.shortName || editingMatch.team1.name.slice(0, 3).toUpperCase(),
        logo: editingMatch.team1.logo || getTeamBadgeSvg(editingMatch.team1.shortName || 'T1', '#004BA0', '#FFD700'),
        score: editingMatch.team1.score
      },
      team2: {
        name: editingMatch.team2.name,
        shortName: editingMatch.team2.shortName || editingMatch.team2.name.slice(0, 3).toUpperCase(),
        logo: editingMatch.team2.logo || getTeamBadgeSvg(editingMatch.team2.shortName || 'T2', '#DA1919', '#FFFFFF'),
        score: editingMatch.team2.score
      },
      status: editingMatch.status || 'upcoming',
      statusText: editingMatch.statusText || 'Starts soon',
      startTimeIST: editingMatch.startTimeIST || 'Today, 7:30 PM IST',
      venue: editingMatch.venue || 'M. Chinnaswamy Stadium, Bengaluru',
      hasOfficialStream: !!editingMatch.hasOfficialStream,
      officialStreamEmbedUrl: editingMatch.officialStreamEmbedUrl,
      officialBroadcaster: {
        name: editingMatch.officialBroadcaster?.name || 'JioCinema',
        url: editingMatch.officialBroadcaster?.url || 'https://www.jiocinema.com',
        logo: 'JioCinema'
      }
    };

    try {
      const res = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchToSave)
      });
      const data = await res.json();
      if (data.success) {
        await fetchData();
        setIsMatchModalOpen(false);
        setEditingMatch(null);
        showNotify('Match saved successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete match
  const handleDeleteMatch = async (id: string) => {
    if (!confirm('Are you sure you want to remove this fixture?')) return;
    try {
      const res = await fetch(`/api/matches/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMatches(matches.filter((m) => m.id !== id));
        showNotify('Match removed.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: '1234',
          settings: {
            adsensePublisherId: settings.adsensePublisherId,
            adsenseEnabled: settings.adsenseEnabled,
            adsenseTestMode: settings.adsenseTestMode,
            contactEmail: settings.contactEmail,
            autoRefreshIntervalSeconds: Number(settings.autoRefreshIntervalSeconds),
            attributionText: settings.attributionText
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotify('System & AdSense Settings updated successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // LOGIN GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              SPORTWAVE LIVE ADMIN
            </h1>
            <p className="text-xs text-slate-500">
              Restricted management console. Authorized sports editors and broadcast directors only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Enter Administrator PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  placeholder="PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-widest text-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/60 p-2.5 rounded-lg border border-red-200 dark:border-red-800">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Authenticate & Unlock Console
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-400">
            For demonstration and pair programming, test PIN is <span className="font-mono font-bold text-slate-700 dark:text-slate-300">1234</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black">SPORTWAVE LIVE CONTROL PANEL</h1>
            <p className="text-xs text-slate-400">
              Live broadcast controller, scores engine, AdSense monetization, and editorial publisher.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold transition-colors"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Eye },
          { id: 'matches', label: `Matches & Live Streams (${matches.length})`, icon: Radio },
          { id: 'news', label: `Sports News (${news.length})`, icon: FileText },
          { id: 'adsense', label: 'Google AdSense Monetization', icon: DollarSign },
          { id: 'settings', label: 'System & Data API', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Live In Progress</span>
              <p className="text-3xl font-black text-red-600 font-mono">
                {matches.filter((m) => m.status === 'live').length}
              </p>
              <p className="text-[11px] text-slate-500">Matches actively telecasting</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Upcoming Fixtures</span>
              <p className="text-3xl font-black text-blue-600 font-mono">
                {matches.filter((m) => m.status === 'upcoming').length}
              </p>
              <p className="text-[11px] text-slate-500">Scheduled in Indian Standard Time</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Published Articles</span>
              <p className="text-3xl font-black text-emerald-600 font-mono">
                {news.length}
              </p>
              <p className="text-[11px] text-slate-500">Original sports journalism pieces</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">AdSense Monetization</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{settings.adsenseEnabled ? 'Active (Test Mode)' : 'Disabled'}</span>
              </p>
              <p className="text-[11px] text-slate-500 font-mono truncate">{settings.adsensePublisherId}</p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Management Shortcuts
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEditingMatch({});
                  setIsMatchModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Match / Stream
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Update Live Scores & Overs
              </button>
              <button
                onClick={() => setActiveTab('adsense')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Configure AdSense Publisher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MATCHES & STREAMS TAB */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              MATCH DIRECTORY & BROADCAST CONTROLS
            </h2>
            <button
              onClick={() => {
                setEditingMatch({});
                setIsMatchModalOpen(true);
              }}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Fixture</span>
            </button>
          </div>

          {/* Matches Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Tournament</th>
                    <th className="py-3 px-4">Matchup & Current Score</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3">Official Broadcaster</th>
                    <th className="py-3 px-3 text-center">Stream</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {matches.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">{m.tournament}</span>
                        <span className="text-[11px] text-slate-400">{m.venue.split(',')[0]}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 dark:text-white">
                            {m.team1.name} ({m.team1.shortName}) vs {m.team2.name} ({m.team2.shortName})
                          </p>
                          <p className="text-[11px] font-mono text-blue-600 dark:text-sky-400 font-semibold">
                            {m.team1.score || '-'} vs {m.team2.score || '-'}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{m.statusText}</p>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-[10px] font-bold">
                          <button
                            onClick={() => handleStatusChange(m.id, 'live')}
                            className={`px-2 py-1 ${m.status === 'live' ? 'bg-red-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}
                          >
                            LIVE
                          </button>
                          <button
                            onClick={() => handleStatusChange(m.id, 'upcoming')}
                            className={`px-2 py-1 ${m.status === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}
                          >
                            UPCOMING
                          </button>
                          <button
                            onClick={() => handleStatusChange(m.id, 'finished')}
                            className={`px-2 py-1 ${m.status === 'finished' ? 'bg-slate-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}
                          >
                            FINAL
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-800 dark:text-slate-200 block">{m.officialBroadcaster.name}</span>
                        <a
                          href={m.officialBroadcaster.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-0.5"
                        >
                          Verify Broadcaster Link <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>

                      <td className="py-3 px-3 text-center">
                        {m.hasOfficialStream ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Authorized
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Broadcaster Only</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setQuickScoreMatchId(m.id);
                              setQuickScore1(m.team1.score || '');
                              setQuickScore2(m.team2.score || '');
                              setQuickStatusText(m.statusText);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded"
                            title="Quick Update Score"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingMatch(m);
                              setIsMatchModalOpen(true);
                            }}
                            className="p-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                            title="Edit Full Match Details"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMatch(m.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded"
                            title="Delete Match"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Score Modal */}
          {quickScoreMatchId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                  Quick Live Score & Overs Updater
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">Team 1 Score (e.g. 196/4 (19 ov)):</label>
                    <input
                      type="text"
                      value={quickScore1}
                      onChange={(e) => setQuickScore1(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Team 2 Score:</label>
                    <input
                      type="text"
                      value={quickScore2}
                      onChange={(e) => setQuickScore2(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Match Situation / Status Text:</label>
                    <input
                      type="text"
                      value={quickStatusText}
                      onChange={(e) => setQuickStatusText(e.target.value)}
                      placeholder="e.g. RCB need 4 runs in 3 balls"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setQuickScoreMatchId(null)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveQuickScore(quickScoreMatchId)}
                    className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Save Live Score
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Full Match Add/Edit Modal */}
          {isMatchModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
              <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl my-8">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingMatch?.id ? 'Edit Match & Broadcast Settings' : 'Add New Sports Match'}
                </h3>

                <form onSubmit={handleSaveMatch} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Sport Type</label>
                      <select
                        value={editingMatch?.sport || 'cricket'}
                        onChange={(e) => setEditingMatch({ ...editingMatch, sport: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        <option value="cricket">Cricket</option>
                        <option value="football">Football</option>
                        <option value="tennis">Tennis</option>
                        <option value="badminton">Badminton</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Tournament Name</label>
                      <input
                        type="text"
                        value={editingMatch?.tournament || ''}
                        onChange={(e) => setEditingMatch({ ...editingMatch, tournament: e.target.value })}
                        placeholder="e.g. TATA IPL 2026 or ISL 2025-26"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Team 1 Full Name</label>
                      <input
                        type="text"
                        value={editingMatch?.team1?.name || ''}
                        onChange={(e) =>
                          setEditingMatch((prev) => ({
                            ...prev,
                            team1: {
                              name: e.target.value,
                              shortName: e.target.value.slice(0, 3).toUpperCase(),
                              logo: prev?.team1?.logo || '',
                              score: prev?.team1?.score
                            }
                          }))
                        }
                        placeholder="e.g. Royal Challengers Bengaluru"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Team 2 Full Name</label>
                      <input
                        type="text"
                        value={editingMatch?.team2?.name || ''}
                        onChange={(e) =>
                          setEditingMatch((prev) => ({
                            ...prev,
                            team2: {
                              name: e.target.value,
                              shortName: e.target.value.slice(0, 3).toUpperCase(),
                              logo: prev?.team2?.logo || '',
                              score: prev?.team2?.score
                            }
                          }))
                        }
                        placeholder="e.g. Chennai Super Kings"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Status</label>
                      <select
                        value={editingMatch?.status || 'upcoming'}
                        onChange={(e) => setEditingMatch((prev) => ({ ...prev, status: e.target.value as any }))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live Now</option>
                        <option value="finished">Finished</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Start Time (IST)</label>
                      <input
                        type="text"
                        value={editingMatch?.startTimeIST || ''}
                        onChange={(e) => setEditingMatch((prev) => ({ ...prev, startTimeIST: e.target.value }))}
                        placeholder="e.g. Today, 7:30 PM IST"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Venue</label>
                      <input
                        type="text"
                        value={editingMatch?.venue || ''}
                        onChange={(e) => setEditingMatch((prev) => ({ ...prev, venue: e.target.value }))}
                        placeholder="e.g. M. Chinnaswamy Stadium"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Status Text / Situation</label>
                    <input
                      type="text"
                      value={editingMatch?.statusText || ''}
                      onChange={(e) => setEditingMatch((prev) => ({ ...prev, statusText: e.target.value }))}
                      placeholder="e.g. Match starts at 7:30 PM IST or Virat Kohli 82* (49)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  {/* Broadcaster Info */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                      Authorized Broadcaster & Streaming Validation
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 mb-1">Broadcaster Name</label>
                        <input
                          type="text"
                          value={editingMatch?.officialBroadcaster?.name || ''}
                          onChange={(e) =>
                            setEditingMatch((prev) => ({
                              ...prev,
                              officialBroadcaster: {
                                name: e.target.value,
                                url: prev?.officialBroadcaster?.url || ''
                              }
                            }))
                          }
                          placeholder="e.g. JioCinema & Star Sports"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 mb-1">Official Broadcaster URL</label>
                        <input
                          type="url"
                          value={editingMatch?.officialBroadcaster?.url || ''}
                          onChange={(e) =>
                            setEditingMatch((prev) => ({
                              ...prev,
                              officialBroadcaster: {
                                name: prev?.officialBroadcaster?.name || 'JioCinema',
                                url: e.target.value
                              }
                            }))
                          }
                          placeholder="https://www.jiocinema.com/sports"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-500 mb-1">
                        Approved Stream Embed URL (YouTube Sports / Licensed iframe embed only)
                      </label>
                      <input
                        type="url"
                        value={editingMatch?.officialStreamEmbedUrl || ''}
                        onChange={(e) => setEditingMatch({ ...editingMatch, officialStreamEmbedUrl: e.target.value, hasOfficialStream: !!e.target.value })}
                        placeholder="https://www.youtube-nocookie.com/embed/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        * In accordance with DMCA & Google AdSense policies, pirated IPTV feeds or unapproved stream URLs are prohibited.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMatchModalOpen(false);
                        setEditingMatch(null);
                      }}
                      className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                    >
                      Save Match Fixture
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SPORTS NEWS TAB */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              EDITORIAL SPORTS ARTICLES & PREVIEWS
            </h2>
          </div>

          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 dark:text-sky-400 uppercase">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className="text-slate-400">{item.publishedAt}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.excerpt}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={`/news/${item.slug}`}
                    target="_blank"
                    className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="View Article Live"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. GOOGLE ADSENSE MONETIZATION TAB */}
      {activeTab === 'adsense' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              GOOGLE ADSENSE MONETIZATION CONTROLLER
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure publisher code, toggle ad positions, and manage review state. Compliant with Google AdSense program policies.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 text-xs sm:text-sm">
            {/* Publisher ID */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Google AdSense Publisher ID (Client ID)
              </label>
              <input
                type="text"
                value={settings.adsensePublisherId}
                onChange={(e) => setSettings({ ...settings, adsensePublisherId: e.target.value })}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="w-full max-w-md px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Your verified 16-digit AdSense client identifier.
              </p>
            </div>

            {/* Master Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="adsEnabled"
                checked={settings.adsenseEnabled}
                onChange={(e) => setSettings({ ...settings, adsenseEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <label htmlFor="adsEnabled" className="font-bold text-slate-800 dark:text-slate-200">
                Enable Advertising Spaces Across Website
              </label>
            </div>

            {/* Test Mode Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="adsTestMode"
                checked={settings.adsenseTestMode}
                onChange={(e) => setSettings({ ...settings, adsenseTestMode: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <label htmlFor="adsTestMode" className="font-bold text-slate-800 dark:text-slate-200">
                AdSense Approval Pre-Launch Preview Mode (Shows labeled mock placeholders until account verification)
              </label>
            </div>

            {/* Placement Policy Checklist */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                AdSense Placement Policy Compliance Check
              </h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Clearly labeled &quot;ADVERTISEMENT&quot; above every unit.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Zero ads overlaying video players or sports controls.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>No deceptive download or fake play buttons.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Adequate distance from match cards and official stream links.</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Monetization Configuration</span>
            </button>
          </form>
        </div>
      )}

      {/* 5. SYSTEM & DATA API TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              SPORTS DATA API & SYSTEM SETTINGS
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure sports-data feed sync, auto-refresh frequency, and copyright attribution.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Data API Auto-Refresh Rate (Seconds)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.autoRefreshIntervalSeconds}
                onChange={(e) => setSettings({ ...settings, autoRefreshIntervalSeconds: Number(e.target.value) })}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Recommended 15 seconds for live cricket and football score polling.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Official Attribution & Syndicate Footer Notice
              </label>
              <input
                type="text"
                value={settings.attributionText}
                onChange={(e) => setSettings({ ...settings, attributionText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Editorial Compliance Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full max-w-md px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 pt-2"
            >
              <Save className="w-4 h-4" />
              <span>Update System Settings</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
