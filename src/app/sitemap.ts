import { MetadataRoute } from 'next';
import { sportsStore } from '@/lib/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sportwavelive.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'always', priority: 1.0 },
    { url: `${baseUrl}/live`, lastModified: new Date(), changeFrequency: 'always', priority: 0.95 },
    { url: `${baseUrl}/cricket`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/football`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/ipl`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/isl`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/schedule`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/results`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/standings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/copyright-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Dynamic match watch pages
  const matches = sportsStore.getMatches();
  const matchRoutes: MetadataRoute.Sitemap = matches.map((m) => ({
    url: `${baseUrl}/watch/${m.id}`,
    lastModified: new Date(),
    changeFrequency: m.status === 'live' ? 'always' : 'daily',
    priority: m.status === 'live' ? 0.9 : 0.7
  }));

  // Dynamic news pages
  const news = sportsStore.getNews();
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75
  }));

  return [...staticRoutes, ...matchRoutes, ...newsRoutes];
}
