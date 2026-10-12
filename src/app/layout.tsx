import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveTicker from '@/components/LiveTicker';
import { sportsStore } from '@/lib/store';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'SPORTWAVE LIVE — Live Scores, Schedules, Official Streaming & Sports Hub India',
    template: '%s | SPORTWAVE LIVE'
  },
  description: 'Your premier sports hub in India. Follow live cricket scores, IPL, ISL, football, schedules, official authorized streaming guides (JioCinema, Star Sports, Sony LIV), and expert sports news.',
  keywords: [
    'Sportwave Live',
    'live cricket score',
    'IPL 2026 live',
    'ISL live score',
    'watch cricket live official',
    'India vs Australia score',
    'Premier league live India',
    'JioCinema sports streaming',
    'Star Sports live match',
    'Indian sports hub'
  ],
  authors: [{ name: 'SPORTWAVE LIVE Editorial Team' }],
  metadataBase: new URL('https://sportwavelive.in'),
  openGraph: {
    title: 'SPORTWAVE LIVE — Official Sports Broadcast Hub India',
    description: 'Follow every match with real-time live scores, match schedules, stats, and verified official broadcast streaming links.',
    url: 'https://sportwavelive.in',
    siteName: 'SPORTWAVE LIVE',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPORTWAVE LIVE — Live Sports Scores & Official Streams',
    description: 'Live cricket, IPL, football, ISL scores, stats and authorized streaming links in India.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const matches = sportsStore.getMatches();
  const news = sportsStore.getNews();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'SPORTWAVE LIVE',
    url: 'https://sportwavelive.in',
    logo: 'https://sportwavelive.in/icon.png',
    description: 'Premier sports broadcast, live scores, and editorial analysis hub for sports enthusiasts across India.',
    areaServed: 'IN'
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sportwave-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
        <Suspense fallback={<div className="h-16 bg-white dark:bg-slate-900" />}>
          <Navbar matches={matches} news={news} />
        </Suspense>
        <LiveTicker matches={matches} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
