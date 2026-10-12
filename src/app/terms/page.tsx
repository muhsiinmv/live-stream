import React from 'react';
import { Metadata } from 'next';
import { FileText, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions — SPORTWAVE LIVE',
  description: 'Terms of Service and Acceptable Use Policy governing your access to the SPORTWAVE LIVE portal and sports information services.',
};

export default function TermsPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement & User Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
          Terms and Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 13, 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using SPORTWAVE LIVE, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you must discontinue use of the website immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Intellectual Property & Fair Dealing
          </h2>
          <p>
            All original editorial analysis, preview articles, commentary descriptions, graphics, and interface designs on SPORTWAVE LIVE are the proprietary intellectual property of SPORTWAVE LIVE. You may not scrape, republish, or redistribute our written content without explicit prior authorization.
          </p>
          <p>
            Team crests, player likenesses, and league trademarks remain the exclusive property of their respective sports authorities (e.g. BCCI, Premier League, AIFF). They are displayed under fair dealing doctrines for informative identification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Authorized Broadcasting Links & Third-Party Platforms
          </h2>
          <p>
            SPORTWAVE LIVE aggregates information regarding official broadcasting partners (including JioCinema, Star Sports, Sony LIV, FanCode). We do not operate, control, or endorse third-party platforms, nor are we responsible for their service quality, pricing, subscriptions, or DRM configurations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Limitation of Liability
          </h2>
          <p>
            While we strive for absolute accuracy in match times, scores, and overs, SPORTWAVE LIVE makes no representations or warranties regarding latency or inadvertent discrepancies. All sports data is provided &quot;as is&quot; for fan entertainment and educational purposes.
          </p>
        </section>
      </div>
    </div>
  );
}
