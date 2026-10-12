import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  Newspaper,
  Tv,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { sportsStore } from '@/lib/store';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';

export const instant = false;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = sportsStore.getNews();
  return articles.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = sportsStore.getNewsBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.title} • Sportwave Live`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: '2026-10-13T12:00:00Z',
      authors: [article.author.name],
      images: [{ url: article.imageUrl }]
    }
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = sportsStore.getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const allNews = sportsStore.getNews();
  const relatedArticles = allNews.filter((n) => n.id !== article.id).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.imageUrl],
    datePublished: '2026-10-13T12:00:00+05:30',
    dateModified: '2026-10-13T12:00:00+05:30',
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'SPORTWAVE LIVE',
      url: 'https://sportwavelive.in'
    }
  };

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <JsonLd data={articleSchema} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/news" className="hover:text-blue-600 transition-colors">Sports News</Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs">{article.category}</span>
      </nav>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Article Content (8 cols) */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          {/* Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-sky-300">
                {article.category}
              </span>
              {article.relatedTournament && (
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {article.relatedTournament}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {article.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{article.author.name}</p>
                  <p className="text-[11px] text-slate-400">{article.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Article Main Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* In-Article Ad Placement */}
          <AdSlot format="in-article" slotId={`news-${article.id}-mid-article`} />

          {/* Article Body Content */}
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-200 space-y-4 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Related Topics:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Post-Article Ad Placement */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <AdSlot format="banner" slotId={`news-${article.id}-post-article`} />
          </div>
        </article>

        {/* Right Column: Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Desktop Sidebar Ad Unit */}
          <div className="sticky top-24 space-y-6">
            <AdSlot format="rectangle" slotId={`news-${article.id}-sidebar-top`} />

            {/* Related Sports Coverage Box */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                Related Editorial Coverage
              </h3>

              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.slug}`}
                    className="block p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-blue-300 transition-colors group"
                  >
                    <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 line-clamp-2 mt-1">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">{rel.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>

            <AdSlot format="rectangle" slotId={`news-${article.id}-sidebar-bottom`} />
          </div>
        </aside>
      </div>
    </div>
  );
}
