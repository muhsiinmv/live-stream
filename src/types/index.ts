export type SportType = 'cricket' | 'football' | 'tennis' | 'badminton' | 'basketball' | 'other';

export type MatchStatus = 'live' | 'upcoming' | 'finished';

export interface CricketBatsman {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isNotOut: boolean;
}

export interface CricketBowler {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface CricketScoreDetails {
  currentInnings: string;
  target?: number;
  runRate: number;
  requiredRunRate?: number;
  partnership: string;
  lastBalls: string[];
  batsmen: CricketBatsman[];
  bowlers: CricketBowler[];
}

export interface FootballEvent {
  minute: number;
  player: string;
  team: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub';
}

export interface FootballScoreDetails {
  half: '1st Half' | 'Half Time' | '2nd Half' | 'Extra Time' | 'Full Time';
  minute: number;
  possession: { team1: number; team2: number };
  shotsOnTarget: { team1: number; team2: number };
  corners: { team1: number; team2: number };
  events: FootballEvent[];
}

export interface CommentaryItem {
  id: string;
  timeOrOver: string;
  headline: string;
  description: string;
  type: 'wicket' | 'boundary' | 'goal' | 'card' | 'normal';
}

export interface Match {
  id: string;
  sport: SportType;
  tournament: string;
  matchNumber?: string;
  team1: {
    name: string;
    shortName: string;
    logo: string;
    score?: string; // e.g. "186/4 (18.2 ov)" or "2"
  };
  team2: {
    name: string;
    shortName: string;
    logo: string;
    score?: string; // e.g. "182/7 (20 ov)" or "1"
  };
  status: MatchStatus;
  statusText: string; // e.g. "RCB need 12 runs in 10 balls" or "LIVE 68'" or "Starts at 7:30 PM IST"
  startTimeIST: string; // e.g. "13 Oct 2026, 7:30 PM IST"
  venue: string;
  hasOfficialStream: boolean;
  officialStreamEmbedUrl?: string; // Authorized iframe embed
  officialBroadcaster: {
    name: string; // e.g. "JioCinema", "Star Sports", "Sony LIV", "FanCode"
    url: string;
    logo?: string;
  };
  cricketDetails?: CricketScoreDetails;
  footballDetails?: FootballScoreDetails;
  commentary?: CommentaryItem[];
  isFeatured?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  sport: SportType;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  relatedTournament?: string;
}

export interface StandingRow {
  position: number;
  team: string;
  shortName: string;
  logo: string;
  played: number;
  won: number;
  lost: number;
  drawnOrNR?: number;
  points: number;
  netRunRateOrGD: string;
  form: ('W' | 'L' | 'D' | 'NR')[];
}

export interface TournamentStandings {
  tournament: string;
  season: string;
  sport: SportType;
  headers: string[];
  rows: StandingRow[];
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  adsenseEnabled: boolean;
  adsensePublisherId: string;
  adsenseTestMode: boolean;
  adminPin: string;
  contactEmail: string;
  dataApiStatus: 'operational' | 'degraded' | 'simulated';
  autoRefreshIntervalSeconds: number;
  attributionText: string;
}
