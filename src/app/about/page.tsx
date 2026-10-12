import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, Users, Globe, Target, Tv } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About SPORTWAVE LIVE — India’s Authorized Sports Hub',
  description: 'Learn about Sportwave Live’s mission, editorial principles, authorized sports broadcasting guides, and commitment to fair rights compliance.',
};

export default function AboutPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          <span>Independent Sports Media Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white">
          About SPORTWAVE LIVE
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Empowering Indian sports fans with fast, accurate live scores, tactical sports journalism, and verified official viewing access.
        </p>
      </div>

      {/* Main Content Blocks */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
        {/* Mission */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            Our Mission & Purpose
          </h2>
          <p>
            Launched to serve millions of passionate sports followers across India, <strong>SPORTWAVE LIVE</strong> provides a fast, uncluttered, and reliable digital destination. Whether following the latest high-octane run chase in the Indian Premier League, tracking Kolkata and Mumbai rivals in the Indian Super League, or following Team India across global tournaments, our platform delivers real-time updates without invasive disruptions.
          </p>
        </section>

        {/* Commitment to Authorized Streaming */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-emerald-600" />
            Our Anti-Piracy & Official Broadcaster Commitment
          </h2>
          <p>
            We take a zero-tolerance stance against digital piracy, unauthorized video restreams, and illegal IPTV aggregators. Indian sports broadcasting is anchored by reputable rights holders including <strong>JioCinema, Star Sports / Disney+ Hotstar, Sony LIV, and FanCode</strong>.
          </p>
          <p>
            SPORTWAVE LIVE acts strictly as an informational guide, providing schedule clarity, official broadcaster directory links, and embeds only when explicitly permitted and authorized by rights owners. We never bypass geo-restrictions, scrape broadcaster DRM feeds, or charge fans for free public information.
          </p>
        </section>

        {/* Editorial Standards */}
        <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Editorial Rigour & Fact-Checking
          </h2>
          <p>
            Our sports writing team adheres to strict verification protocols. Match reports, tactical analysis, and player statistics are derived directly from verified official scoring data and recognized sporting syndicates. We do not generate speculative rumors or publish unconfirmed scorecards.
          </p>
        </section>

        {/* Trademark & Independence Notice */}
        <section className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Independence & Trademark Disclaimer
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            SPORTWAVE LIVE is an independent publication. Trademarks, team emblems, tournament logos (including BCCI, TATA IPL, AIFF, ISL, Premier League, ICC) belong to their respective registered owners. Their editorial reproduction on this site is purely for identification and reporting under fair dealing principles of copyright law.
          </p>
        </section>
      </div>
    </div>
  );
}
