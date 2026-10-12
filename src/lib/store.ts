import { Match, NewsArticle, SiteSettings, TournamentStandings } from '@/types';
import { INITIAL_MATCHES, STANDINGS_DATA } from './sportsData';
import { INITIAL_NEWS } from './newsData';

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'SPORTWAVE LIVE',
  siteTagline: 'Your Sports. Your Passion. Live.',
  adsenseEnabled: true,
  adsensePublisherId: 'ca-pub-9842109842109842',
  adsenseTestMode: true,
  adminPin: '1234',
  contactEmail: 'contact@sportwavelive.in',
  dataApiStatus: 'operational',
  autoRefreshIntervalSeconds: 15,
  attributionText: 'Official match data & broadcasts attributed to licensed partners and tournament syndicates.'
};

// Global in-memory storage for runtime (Next.js server)
class SportsStore {
  private matches: Match[] = [...INITIAL_MATCHES];
  private news: NewsArticle[] = [...INITIAL_NEWS];
  private standings: Record<string, TournamentStandings> = { ...STANDINGS_DATA };
  private settings: SiteSettings = { ...DEFAULT_SETTINGS };

  getMatches(): Match[] {
    return this.matches;
  }

  getMatchById(id: string): Match | undefined {
    return this.matches.find((m) => m.id === id);
  }

  addOrUpdateMatch(match: Match): Match {
    const index = this.matches.findIndex((m) => m.id === match.id);
    if (index >= 0) {
      this.matches[index] = { ...this.matches[index], ...match };
      return this.matches[index];
    } else {
      this.matches.unshift(match);
      return match;
    }
  }

  deleteMatch(id: string): boolean {
    const initialLen = this.matches.length;
    this.matches = this.matches.filter((m) => m.id !== id);
    return this.matches.length < initialLen;
  }

  getNews(): NewsArticle[] {
    return this.news;
  }

  getNewsBySlug(slug: string): NewsArticle | undefined {
    return this.news.find((n) => n.slug === slug);
  }

  addOrUpdateNews(article: NewsArticle): NewsArticle {
    const index = this.news.findIndex((n) => n.id === article.id || n.slug === article.slug);
    if (index >= 0) {
      this.news[index] = { ...this.news[index], ...article };
      return this.news[index];
    } else {
      this.news.unshift(article);
      return article;
    }
  }

  getStandings(): Record<string, TournamentStandings> {
    return this.standings;
  }

  getSettings(): SiteSettings {
    return this.settings;
  }

  updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...newSettings };
    return this.settings;
  }
}

// Global singleton
declare global {
  var __sportwave_store: SportsStore | undefined;
}

export const sportsStore = global.__sportwave_store || new SportsStore();
if (process.env.NODE_ENV !== 'production') {
  global.__sportwave_store = sportsStore;
}
