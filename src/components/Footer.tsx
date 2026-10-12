import React from 'react';
import Link from 'next/link';
import { Play, ShieldCheck, Heart, Mail, ExternalLink, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner inside Footer */}
      <div className="border-b border-slate-800 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">SPORTWAVE LIVE</h3>
                <p className="text-xs text-slate-400">
                  India&apos;s Dedicated Hub for Authorized Sports Broadcasts, Live Scores & Analysis.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-400">Official Streaming Partners:</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 font-semibold">
                JioCinema
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 font-semibold">
                Star Sports
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 font-semibold">
                Sony LIV
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 font-semibold">
                FanCode
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Sports Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sports Central
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/live" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Live Scores Hub
                </Link>
              </li>
              <li>
                <Link href="/cricket" className="hover:text-sky-400 transition-colors">
                  Cricket Matches
                </Link>
              </li>
              <li>
                <Link href="/football" className="hover:text-sky-400 transition-colors">
                  Football Matches
                </Link>
              </li>
              <li>
                <Link href="/ipl" className="hover:text-sky-400 transition-colors">
                  TATA IPL 2026
                </Link>
              </li>
              <li>
                <Link href="/isl" className="hover:text-sky-400 transition-colors">
                  Indian Super League
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-sky-400 transition-colors">
                  Upcoming Match Schedule
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-sky-400 transition-colors">
                  Recent Match Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tournaments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Tournaments & Tables
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/standings" className="hover:text-sky-400 transition-colors">
                  Tournament Standings
                </Link>
              </li>
              <li>
                <Link href="/ipl" className="hover:text-sky-400 transition-colors">
                  IPL Points Table
                </Link>
              </li>
              <li>
                <Link href="/isl" className="hover:text-sky-400 transition-colors">
                  ISL Points Table
                </Link>
              </li>
              <li>
                <Link href="/standings" className="hover:text-sky-400 transition-colors">
                  Premier League Table
                </Link>
              </li>
              <li>
                <Link href="/cricket" className="hover:text-sky-400 transition-colors">
                  Border-Gavaskar Trophy
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-sky-400 transition-colors">
                  BWF Badminton World Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: News & Editorial */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sports News & Analysis
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/news" className="hover:text-sky-400 transition-colors">
                  Latest Sports News
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-sky-400 transition-colors">
                  IPL Match Previews
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-sky-400 transition-colors">
                  Tactical Debriefs
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-sky-400 transition-colors">
                  Player Profiles
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-sky-400 transition-colors">
                  Team News & Squad Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Policy & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">
                  Contact Editorial Team
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-400 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-sky-400 transition-colors">
                  Sports Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/copyright-policy" className="hover:text-sky-400 transition-colors">
                  Copyright & DMCA Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Broadcast Notice */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Broadcasting Ethics
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              SPORTWAVE LIVE is committed to legitimate sports journalism. We only link to authorized broadcast partners (JioCinema, Star Sports, Sony LIV) and never host unauthorized video restreams or pirated feeds.
            </p>
            <div className="pt-1">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
              >
                <span>Admin Portal</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & AdSense Attribution */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-3">
          <p>
            <strong>Disclaimer:</strong> SPORTWAVE LIVE is an independent sports media portal designed for sports enthusiasts in India. Team names, logos, tournament identifiers (including IPL, ISL, BCCI, Premier League, UEFA) are trademarks of their respective owners and used solely for identification and editorial reporting under fair dealing principles. SPORTWAVE LIVE is not affiliated with, sponsored by, or endorsed by BCCI, IPL, AIFF, or any sports league.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>© {currentYear} SPORTWAVE LIVE. All rights reserved. Indian Standard Time (IST).</p>
            <p className="flex items-center gap-1">
              Crafted for sports fans across India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
