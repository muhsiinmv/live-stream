import React from 'react';
import { Metadata } from 'next';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sports & Broadcasting Disclaimer — SPORTWAVE LIVE',
  description: 'Official disclaimer regarding sports data accuracy, official broadcast rights, and league independence for SPORTWAVE LIVE.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Transparency & Legal Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
          Sports & Broadcast Disclaimer
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 13, 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. No Official Affiliation
          </h2>
          <p>
            <strong>SPORTWAVE LIVE</strong> is an independent digital media platform. We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with the Board of Control for Cricket in India (BCCI), Indian Premier League (IPL), All India Football Federation (AIFF), Football Sports Development Limited (FSDL), International Cricket Council (ICC), English Premier League, UEFA, or any of their subsidiaries or affiliates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Live Scores & Data Accuracy
          </h2>
          <p>
            All live scores, match schedules, overs, run rates, ball-by-ball commentaries, and tournament standings displayed on SPORTWAVE LIVE are sourced from public sports feeds and syndication data. While we make every attempt to ensure live updates reflect real-time on-pitch action, technical delays, third-party network outages, or umpire decisions may occasionally introduce brief delays.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Broadcasting Links & Intellectual Property Rights
          </h2>
          <p>
            SPORTWAVE LIVE does not host, upload, or transmit any video streams on its own servers. All streaming references point to authorized, licensed third-party platforms (e.g. JioCinema, Star Sports, Sony LIV, FanCode). We firmly reject pirated IPTV restreams, unauthorized feeds, or DRM-bypass mechanisms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. No Betting or Financial Advice
          </h2>
          <p>
            SPORTWAVE LIVE is strictly an informational and news website for sports fans. We do not provide sports betting services, gambling odds, or wagering advice.
          </p>
        </section>
      </div>
    </div>
  );
}
