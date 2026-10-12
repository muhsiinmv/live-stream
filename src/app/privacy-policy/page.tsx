import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Google AdSense & Cookies Disclosure',
  description: 'Official privacy policy for SPORTWAVE LIVE detailing data protection, cookie usage, Google AdSense DoubleClick DART cookies, and user rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>User Privacy & Data Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 13, 2026 • Effective immediately
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Introduction & Scope
          </h2>
          <p>
            At <strong>SPORTWAVE LIVE</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), accessible from <strong>https://sportwavelive.in</strong>, the privacy of our visitors is of paramount importance. This Privacy Policy outlines the types of personal information collected and recorded by SPORTWAVE LIVE and how we protect and utilize it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Google AdSense & DoubleClick DART Cookie
          </h2>
          <p>
            Google is a third-party vendor on our website. It uses cookies, known as DART cookies, to serve advertisements to our site visitors based on their visit to www.sportwavelive.in and other sites on the internet.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-sky-400 underline font-semibold"
              >
                Google Ads Settings
              </a>.
            </li>
            <li>
              Alternatively, visitors can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-sky-400 underline font-semibold"
              >
                aboutads.info
              </a>.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Log Files & Analytics
          </h2>
          <p>
            SPORTWAVE LIVE follows a standard procedure of utilizing log files. These files log visitors when they navigate websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Indian Digital Personal Data Protection Act (DPDPA 2023)
          </h2>
          <p>
            For visitors accessing SPORTWAVE LIVE within the Republic of India, we process personal data in strict alignment with the <em>Digital Personal Data Protection Act, 2023</em>. We collect only minimal technical data necessary for site performance and user preferences (such as light/dark theme stored locally in your browser). We do not sell your personal information to data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            5. Children&apos;s Information Protection
          </h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. SPORTWAVE LIVE does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our Data Compliance Officer via email at{' '}
            <strong className="text-slate-800 dark:text-slate-200">compliance@sportwavelive.in</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
