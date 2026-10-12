'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Radio,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Tv,
  AlertCircle
} from 'lucide-react';
import { Match } from '@/types';

interface VideoPlayerProps {
  match: Match;
}

export default function VideoPlayer({ match }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('1080p HD (60fps)');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [streamHealth, setStreamHealth] = useState<'optimal' | 'reconnecting'>('optimal');
  const [useEmbed, setUseEmbed] = useState(false);

  // If there's an embed URL available
  const hasEmbedUrl = !!match.officialStreamEmbedUrl;

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
      {/* Top Player Status Bar */}
      <div className="bg-slate-900/90 px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
          <span className="font-extrabold text-red-500 tracking-wider uppercase text-[11px]">
            OFFICIAL LIVE TRANSMISSION
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-none">
            {match.team1.shortName} vs {match.team2.shortName} • {match.tournament}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Bitrate: 6.8 Mbps</span>
          </div>
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
            {quality.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Main Video Viewport (16:9 ratio) */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group select-none">
        {hasEmbedUrl && useEmbed ? (
          <iframe
            src={match.officialStreamEmbedUrl}
            title={`${match.team1.name} vs ${match.team2.name} Live Stream`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Simulated Official Stream Visualizer & Digital Match Broadcast */
          <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-radial from-slate-900 via-slate-950 to-black">
            {/* Dynamic Sports Background Stadium Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Stadium Pitch Markings Graphics */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-72 h-72 rounded-full border-2 border-white" />
              <div className="absolute w-full h-0.5 bg-white" />
            </div>

            {/* Center Broadcast Content */}
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Authorized Broadcaster Feed • Rights Protected</span>
              </div>

              {/* Matchup Banner */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 py-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-800/80 p-2 border-2 border-slate-700 shadow-xl flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={match.team1.logo} alt={match.team1.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">{match.team1.shortName}</span>
                  {match.team1.score && (
                    <span className="text-xl font-black text-sky-400 font-mono">{match.team1.score}</span>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-500 tracking-widest uppercase">VS</span>
                  <span className="text-[11px] text-red-500 font-bold mt-1 animate-pulse">● LIVE</span>
                  <span className="text-xs text-slate-400 mt-2 font-medium">{match.venue.split(',')[0]}</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-800/80 p-2 border-2 border-slate-700 shadow-xl flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={match.team2.logo} alt={match.team2.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">{match.team2.shortName}</span>
                  {match.team2.score && (
                    <span className="text-xl font-black text-sky-400 font-mono">{match.team2.score}</span>
                  )}
                </div>
              </div>

              {/* Status summary */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium px-4 py-2 bg-slate-900/80 rounded-lg border border-slate-800 max-w-lg mx-auto">
                {match.statusText}
              </p>

              {/* Action options */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={match.officialBroadcaster.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  <Tv className="w-4 h-4" />
                  <span>Watch on Official Platform ({match.officialBroadcaster.name})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {hasEmbedUrl && (
                  <button
                    onClick={() => setUseEmbed(!useEmbed)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
                  >
                    <span>Toggle Approved Embed Stream</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Overlay Bottom Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between opacity-95 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 text-white hover:text-sky-400 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 text-white hover:text-sky-400 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-1.5 text-xs text-red-500 font-bold ml-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Quality dropdown */}
            <button
              onClick={() => setShowQualityMenu(!showQualityMenu)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title="Stream Quality"
            >
              <Settings className="w-5 h-5" />
            </button>

            {showQualityMenu && (
              <div className="absolute right-8 bottom-10 bg-slate-900 border border-slate-700 rounded-lg p-1.5 shadow-xl text-xs space-y-1 w-44 z-30">
                {['1080p HD (60fps)', '720p HD', '480p SD', 'Auto (Adaptive)'].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuality(q);
                      setShowQualityMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded transition-colors ${
                      quality === q ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                const elem = document.documentElement;
                if (!document.fullscreenElement) {
                  elem.requestFullscreen?.();
                } else {
                  document.exitFullscreen?.();
                }
              }}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Broadcaster Compliance & Rights Bar */}
      <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Licensed by official tournament partners. SPORTWAVE LIVE operates in full compliance with copyright and digital streaming regulations.
          </span>
        </div>
        <a
          href={match.officialBroadcaster.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold"
        >
          <span>Open Broadcaster App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
