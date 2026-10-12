import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Radio,
  Calendar,
  MapPin,
  Tv,
  ExternalLink,
  ChevronLeft,
  Share2,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { sportsStore } from '@/lib/store';
import VideoPlayer from '@/components/VideoPlayer';
import CricketScorecard from '@/components/CricketScorecard';
import FootballScorecard from '@/components/FootballScorecard';
import LiveCommentary from '@/components/LiveCommentary';
import MatchCard from '@/components/MatchCard';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';

export const instant = false;

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const matches = sportsStore.getMatches();
  return matches.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const match = sportsStore.getMatchById(id);

  if (!match) {
    return { title: 'Match Not Found' };
  }

  return {
    title: `${match.team1.shortName} vs ${match.team2.shortName} Live Stream & Score • ${match.tournament}`,
    description: `Watch official live stream & real-time live score for ${match.team1.name} vs ${match.team2.name} in ${match.tournament}. Authorized Indian broadcast on ${match.officialBroadcaster.name}.`,
    openGraph: {
      title: `${match.team1.name} vs ${match.team2.name} Live Score & Official Stream`,
      description: match.statusText,
      type: 'video.other'
    }
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const match = sportsStore.getMatchById(id);

  if (!match) {
    notFound();
  }

  const allMatches = sportsStore.getMatches();
  const relatedMatches = allMatches.filter((m) => m.id !== match.id && (m.sport === match.sport || m.tournament === match.tournament)).slice(0, 3);

  // Sports Event JSON-LD schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.team1.name} vs ${match.team2.name}`,
    description: match.statusText,
    startDate: '2026-10-13T19:30:00+05:30',
    location: {
      '@type': 'Place',
      name: match.venue
    },
    competitor: [
      { '@type': 'SportsTeam', name: match.team1.name },
      { '@type': 'SportsTeam', name: match.team2.name }
    ],
    eventStatus: match.status === 'live' ? 'https://schema.org/EventLive' : 'https://schema.org/EventScheduled'
  };

  return (
    <div className="py-6 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <JsonLd data={eventSchema} />

      {/* Back button and breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/live"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Live Scores Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          {match.status === 'live' && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 border border-red-200 dark:border-red-800">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              LIVE MATCH BROADCAST
            </span>
          )}
          <span className="text-xs font-mono text-slate-500">{match.tournament}</span>
        </div>
      </div>

      {/* MATCH TITLE & HEADLINE BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 mb-1">
              <span>{match.tournament}</span>
              {match.matchNumber && <span>• {match.matchNumber}</span>}
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-950 dark:text-white">
              {match.team1.name} vs {match.team2.name}
            </h1>
            <p className="text-sm font-semibold text-blue-700 dark:text-sky-300 mt-1">
              {match.statusText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{match.venue}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{match.startTimeIST}</span>
            </div>
            <a
              href={match.officialBroadcaster.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-sky-300 rounded-lg font-bold border border-blue-200 dark:border-blue-800/80 hover:bg-blue-100 transition-colors"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Stream: {match.officialBroadcaster.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER & LIVE SCOREBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video Player & Commentary (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Broadcast Player */}
          <VideoPlayer match={match} />

          {/* Fallback Notice Bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Authorized Live Transmission Policy
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                SPORTWAVE LIVE connects viewers directly to authorized broadcast syndications. If digital playback is geo-restricted or subscription-gated by the rights holder, click{' '}
                <a
                  href={match.officialBroadcaster.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 dark:text-sky-400 underline"
                >
                  Watch on {match.officialBroadcaster.name}
                </a>{' '}
                for verified official access.
              </p>
            </div>
          </div>

          {/* Live Text Commentary */}
          {match.commentary && match.commentary.length > 0 && (
            <LiveCommentary items={match.commentary} />
          )}

          {/* In-Article / Below Player Ad */}
          <AdSlot format="banner" slotId={`watch-${match.id}-below-player`} />
        </div>

        {/* Right Column: Scorecard & Match Statistics (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cricket Detailed Scorecard */}
          {match.cricketDetails && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Cricket Scorecard
                </h2>
                <span className="text-[11px] font-mono text-blue-600 dark:text-sky-400 font-bold">
                  Auto-Refreshing
                </span>
              </div>
              <CricketScorecard details={match.cricketDetails} />
            </div>
          )}

          {/* Football Detailed Scorecard */}
          {match.footballDetails && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Match Statistics & Timeline
                </h2>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  Active
                </span>
              </div>
              <FootballScorecard
                details={match.footballDetails}
                team1Name={match.team1.shortName}
                team2Name={match.team2.shortName}
              />
            </div>
          )}

          {/* Sidebar Google AdSense Unit */}
          <AdSlot format="rectangle" slotId={`watch-${match.id}-sidebar`} />
        </div>
      </div>

      {/* RELATED & UPCOMING MATCHES UNDERNEATH */}
      {relatedMatches.length > 0 && (
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              RELATED & UPCOMING FIXTURES
            </h2>
            <Link
              href="/schedule"
              className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline"
            >
              Full Schedule →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedMatches.map((m) => (
              <MatchCard key={m.id} match={m} variant={m.status === 'live' ? 'live' : 'upcoming'} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
