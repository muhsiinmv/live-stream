import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Copyright & Content Removal Policy (DMCA) — SPORTWAVE LIVE',
  description: 'Procedures for rights holders to submit copyright notices or content takedown requests on SPORTWAVE LIVE.',
};

export default function CopyrightPolicyPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Rights Holders & DMCA Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
          Copyright & Content Removal Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 13, 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Respect for Intellectual Property
          </h2>
          <p>
            SPORTWAVE LIVE respects the intellectual property rights of sports broadcasters, leagues, clubs, and photographers. We operate under the provisions of the Indian Copyright Act, 1957 (as amended) and international Digital Millennium Copyright Act (DMCA) standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Our Broadcast Aggregation Principles
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li>We do not host or store proprietary broadcast video streams on our servers.</li>
            <li>We do not provide unauthorized links, pirated IPTV feeds, or M3U8 scraping endpoints.</li>
            <li>We only index verified official broadcast platforms (e.g. JioCinema, Star Sports, Disney+ Hotstar, Sony LIV, FanCode) and standard official embed codes when authorized by the rights holder.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Filing a Content Removal Request
          </h2>
          <p>
            If you are a copyright owner or an authorized agent thereof and believe that any content or stream reference on SPORTWAVE LIVE infringes upon your copyright, you may submit a formal notification to our Designated Copyright Agent with the following details:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>Physical or electronic signature of the authorized copyright holder.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material or URL on SPORTWAVE LIVE to be removed or disabled.</li>
            <li>Your contact details: Name, organization, physical address, telephone number, and official email address.</li>
            <li>A statement confirming your good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement, under penalty of perjury, that the information in the notification is accurate.</li>
          </ol>
        </section>

        <section className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            Designated Copyright Agent Contact
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Email: <strong className="font-mono text-blue-600 dark:text-sky-400">compliance@sportwavelive.in</strong>
          </p>
          <p className="text-[11px] text-slate-500">
            Valid notices will receive an acknowledgement and expedited action within 24 business hours.
          </p>
        </section>
      </div>
    </div>
  );
}
