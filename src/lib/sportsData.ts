import { Match, TournamentStandings } from '@/types';

// Helper to generate simple crisp SVG team badges
export const getTeamBadgeSvg = (shortName: string, primaryColor: string, secondaryColor: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="4"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="${secondaryColor}" stroke-width="1.5" stroke-dasharray="4 2"/>
    <text x="50" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="${secondaryColor}" text-anchor="middle">${shortName}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'ipl-rcb-csk-live',
    sport: 'cricket',
    tournament: 'TATA IPL 2026',
    matchNumber: 'Match 34 of 74',
    team1: {
      name: 'Royal Challengers Bengaluru',
      shortName: 'RCB',
      logo: getTeamBadgeSvg('RCB', '#DA1919', '#EAA72A'),
      score: '194/4 (18.4 ov)'
    },
    team2: {
      name: 'Chennai Super Kings',
      shortName: 'CSK',
      logo: getTeamBadgeSvg('CSK', '#FFD103', '#0047AB'),
      score: '192/6 (20.0 ov)'
    },
    status: 'live',
    statusText: 'RCB need 10 runs in 8 balls • Virat Kohli 82* (49)',
    startTimeIST: 'Today, 7:30 PM IST',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    hasOfficialStream: true,
    // Authorized YouTube or sports embed or official embed
    officialStreamEmbedUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8b4kM2rA8X8H5-eA0tq4vg',
    officialBroadcaster: {
      name: 'JioCinema & Star Sports',
      url: 'https://www.jiocinema.com/sports',
      logo: 'JioCinema'
    },
    isFeatured: true,
    cricketDetails: {
      currentInnings: 'RCB Innings (Target: 193)',
      target: 193,
      runRate: 10.39,
      requiredRunRate: 7.5,
      partnership: '48 (22) between Kohli & Maxwell',
      lastBalls: ['1', '4', '6', '1', '2', '4'],
      batsmen: [
        { name: 'Virat Kohli', runs: 82, balls: 49, fours: 7, sixes: 4, strikeRate: 167.35, isNotOut: true },
        { name: 'Glenn Maxwell', runs: 34, balls: 16, fours: 2, sixes: 3, strikeRate: 212.50, isNotOut: true },
        { name: 'Faf du Plessis (c)', runs: 42, balls: 24, fours: 5, sixes: 2, strikeRate: 175.00, isNotOut: false },
        { name: 'Rajat Patidar', runs: 18, balls: 11, fours: 2, sixes: 0, strikeRate: 163.63, isNotOut: false },
      ],
      bowlers: [
        { name: 'Matheesha Pathirana', overs: 3.4, maidens: 0, runs: 38, wickets: 2, economy: 10.36 },
        { name: 'Ravindra Jadeja', overs: 4.0, maidens: 0, runs: 28, wickets: 1, economy: 7.00 },
        { name: 'Mustafizur Rahman', overs: 4.0, maidens: 0, runs: 45, wickets: 1, economy: 11.25 },
        { name: 'Deepak Chahar', overs: 3.0, maidens: 0, runs: 32, wickets: 0, economy: 10.67 }
      ]
    },
    commentary: [
      { id: 'c1', timeOrOver: '18.4', headline: 'FOUR! Smashed over extra cover!', description: 'Full outside off from Pathirana, Maxwell makes room and lofts it cleanly over cover boundary! What an exhibition of power hitting.', type: 'boundary' },
      { id: 'c2', timeOrOver: '18.3', headline: 'Two runs taken smartly', description: 'Kohli clips off his pads through deep midwicket, sharp running between the wickets pushes the fielder.', type: 'normal' },
      { id: 'c3', timeOrOver: '18.2', headline: 'Single to deep square leg', description: 'Short-of-a-length delivery on middle, pulled away towards deep square leg for one.', type: 'normal' },
      { id: 'c4', timeOrOver: '18.1', headline: 'SIX! Maximum over long on!', description: 'Virat Kohli goes downtown! Dances down the track and powers it 92 meters into the top tier of Chinnaswamy.', type: 'boundary' },
      { id: 'c5', timeOrOver: '17.6', headline: 'FOUR! Classic Kohli cover drive', description: 'Overpitched by Mustafizur, punished with surgical precision through the covers.', type: 'boundary' },
      { id: 'c6', timeOrOver: '16.4', headline: 'WICKET! Cameron Green c Dhoni b Pathirana 14(8)', description: 'Searing yorker! Cameron Green gets an inside edge and MS Dhoni takes a diving catch behind the stumps.', type: 'wicket' }
    ]
  },
  {
    id: 'isl-mbsg-mcfc-live',
    sport: 'football',
    tournament: 'Indian Super League 2025-26',
    matchNumber: 'Semi-Final 1st Leg',
    team1: {
      name: 'Mohun Bagan Super Giant',
      shortName: 'MBSG',
      logo: getTeamBadgeSvg('MB', '#155724', '#85144b'),
      score: '2'
    },
    team2: {
      name: 'Mumbai City FC',
      shortName: 'MCFC',
      logo: getTeamBadgeSvg('MCFC', '#0047AB', '#FFD700'),
      score: '1'
    },
    status: 'live',
    statusText: 'LIVE 74\' • MBSG lead 2-1 • High Intensity Clash',
    startTimeIST: 'Today, 8:00 PM IST',
    venue: 'Salt Lake Stadium, Kolkata (VYBK)',
    hasOfficialStream: true,
    officialBroadcaster: {
      name: 'JioCinema & Sports18',
      url: 'https://www.jiocinema.com/sports/football',
      logo: 'Sports18'
    },
    isFeatured: true,
    footballDetails: {
      half: '2nd Half',
      minute: 74,
      possession: { team1: 54, team2: 46 },
      shotsOnTarget: { team1: 7, team2: 4 },
      corners: { team1: 6, team2: 3 },
      events: [
        { minute: 23, player: 'Jason Cummings', team: 'Mohun Bagan SG', type: 'goal' },
        { minute: 41, player: 'Lallianzuala Chhangte', team: 'Mumbai City FC', type: 'goal' },
        { minute: 58, player: 'Liston Colaco', team: 'Mohun Bagan SG', type: 'goal' },
        { minute: 62, player: 'Subhasish Bose', team: 'Mohun Bagan SG', type: 'yellow_card' },
        { minute: 71, player: 'Yoell van Nieff', team: 'Mumbai City FC', type: 'yellow_card' }
      ]
    },
    commentary: [
      { id: 'fc1', timeOrOver: '74\'', headline: 'Chhangte hits the woodwork!', description: 'What a strike from Chhangte on the half-volley from 22 yards! Kaith got fingertips to it pushing it onto the crossbar.', type: 'normal' },
      { id: 'fc2', timeOrOver: '71\'', headline: 'Yellow Card for Yoell van Nieff', description: 'Tactical foul right on the edge of the circle halting Manvir Singh\'s counter-attack.', type: 'card' },
      { id: 'fc3', timeOrOver: '58\'', headline: 'GOAAAL! Liston Colaco curler (2-1)!', description: 'Liston cuts inside from the left wing, sends the defender sliding, and curls a glorious strike into the top right postage stamp!', type: 'goal' },
      { id: 'fc4', timeOrOver: '41\'', headline: 'GOAAAL! Chhangte equalizer for Mumbai!', description: 'Bipin Singh with a low drilled cross from the left, Chhangte taps in past Kaith at the far post.', type: 'goal' },
      { id: 'fc5', timeOrOver: '23\'', headline: 'GOAAAL! Cummings opens scoring for MBSG!', description: 'Clinical header by Jason Cummings off a pinpoint Petratos corner delivery.', type: 'goal' }
    ]
  },
  {
    id: 'cricket-ind-aus-live',
    sport: 'cricket',
    tournament: 'Border-Gavaskar Trophy Test Series',
    matchNumber: '3rd Test • Day 4',
    team1: {
      name: 'India',
      shortName: 'IND',
      logo: getTeamBadgeSvg('IND', '#003399', '#FF9933'),
      score: '286 & 210/3 (52 ov)'
    },
    team2: {
      name: 'Australia',
      shortName: 'AUS',
      logo: getTeamBadgeSvg('AUS', '#006633', '#FFCC00'),
      score: '344 & 180'
    },
    status: 'live',
    statusText: 'India lead by 152 runs • Shubman Gill 78*, Rishabh Pant 45*',
    startTimeIST: 'Today, 9:30 AM IST',
    venue: 'Sydney Cricket Ground, Sydney',
    hasOfficialStream: true,
    officialBroadcaster: {
      name: 'Star Sports & Disney+ Hotstar',
      url: 'https://www.hotstar.com/sports',
      logo: 'StarSports'
    },
    isFeatured: true,
    cricketDetails: {
      currentInnings: 'India 2nd Innings',
      runRate: 4.03,
      partnership: '84 (98) between Gill & Pant',
      lastBalls: ['0', '4', '0', '1', '4', '2'],
      batsmen: [
        { name: 'Shubman Gill', runs: 78, balls: 114, fours: 9, sixes: 1, strikeRate: 68.42, isNotOut: true },
        { name: 'Rishabh Pant (wk)', runs: 45, balls: 48, fours: 6, sixes: 2, strikeRate: 93.75, isNotOut: true },
        { name: 'Yashasvi Jaiswal', runs: 58, balls: 84, fours: 7, sixes: 0, strikeRate: 69.04, isNotOut: false },
        { name: 'Rohit Sharma (c)', runs: 21, balls: 32, fours: 3, sixes: 0, strikeRate: 65.62, isNotOut: false }
      ],
      bowlers: [
        { name: 'Pat Cummins', overs: 14.0, maidens: 3, runs: 48, wickets: 1, economy: 3.42 },
        { name: 'Mitchell Starc', overs: 12.0, maidens: 2, runs: 54, wickets: 1, economy: 4.50 },
        { name: 'Nathan Lyon', overs: 16.0, maidens: 2, runs: 62, wickets: 1, economy: 3.87 },
        { name: 'Josh Hazlewood', overs: 10.0, maidens: 2, runs: 38, wickets: 0, economy: 3.80 }
      ]
    },
    commentary: [
      { id: 'ind1', timeOrOver: '51.5', headline: 'FOUR! Reverse sweep from Pant!', description: 'Audacious shot against Nathan Lyon! Pant pivots and sweeps over the backward point boundary.', type: 'boundary' },
      { id: 'ind2', timeOrOver: '50.2', headline: 'FOUR! Gill drives on the up', description: 'Classic Shubman Gill punch through mid-off off Starc. Pure elegance.', type: 'boundary' }
    ]
  },
  {
    id: 'pl-ars-mci-upcoming',
    sport: 'football',
    tournament: 'Premier League 2025-26',
    matchNumber: 'Matchday 30',
    team1: {
      name: 'Arsenal',
      shortName: 'ARS',
      logo: getTeamBadgeSvg('ARS', '#EF0107', '#063672'),
      score: undefined
    },
    team2: {
      name: 'Manchester City',
      shortName: 'MCI',
      logo: getTeamBadgeSvg('MCI', '#6CABDD', '#1C2C5B'),
      score: undefined
    },
    status: 'upcoming',
    statusText: 'Starts Tomorrow at 9:00 PM IST',
    startTimeIST: 'Tomorrow, 9:00 PM IST',
    venue: 'Emirates Stadium, London',
    hasOfficialStream: true,
    officialBroadcaster: {
      name: 'Disney+ Hotstar & Star Sports Select',
      url: 'https://www.hotstar.com/sports/football',
      logo: 'Disney+ Hotstar'
    },
    isFeatured: true
  },
  {
    id: 'ipl-mi-kkr-upcoming',
    sport: 'cricket',
    tournament: 'TATA IPL 2026',
    matchNumber: 'Match 35 of 74',
    team1: {
      name: 'Mumbai Indians',
      shortName: 'MI',
      logo: getTeamBadgeSvg('MI', '#004BA0', '#D1AB3E'),
      score: undefined
    },
    team2: {
      name: 'Kolkata Knight Riders',
      shortName: 'KKR',
      logo: getTeamBadgeSvg('KKR', '#3A225D', '#ECC542'),
      score: undefined
    },
    status: 'upcoming',
    statusText: 'Starts Tomorrow at 7:30 PM IST',
    startTimeIST: 'Tomorrow, 7:30 PM IST',
    venue: 'Wankhede Stadium, Mumbai',
    hasOfficialStream: true,
    officialBroadcaster: {
      name: 'JioCinema & Star Sports',
      url: 'https://www.jiocinema.com/sports',
      logo: 'JioCinema'
    },
    isFeatured: true
  },
  {
    id: 'isl-kbf-bfc-upcoming',
    sport: 'football',
    tournament: 'Indian Super League 2025-26',
    matchNumber: 'Southern Derby',
    team1: {
      name: 'Kerala Blasters FC',
      shortName: 'KBFC',
      logo: getTeamBadgeSvg('KBFC', '#FEE200', '#0047AB'),
      score: undefined
    },
    team2: {
      name: 'Bengaluru FC',
      shortName: 'BFC',
      logo: getTeamBadgeSvg('BFC', '#0047AB', '#E31B23'),
      score: undefined
    },
    status: 'upcoming',
    statusText: 'Starts Friday at 7:30 PM IST',
    startTimeIST: 'Friday, 17 Oct 2026, 7:30 PM IST',
    venue: 'Jawaharlal Nehru International Stadium, Kochi',
    hasOfficialStream: true,
    officialBroadcaster: {
      name: 'JioCinema & Sports18',
      url: 'https://www.jiocinema.com/sports',
      logo: 'JioCinema'
    }
  },
  {
    id: 'badminton-all-england-upcoming',
    sport: 'badminton',
    tournament: 'BWF World Tour • All England Open 2026',
    matchNumber: 'Men\'s Singles Quarter-Final',
    team1: {
      name: 'Lakshya Sen (IND)',
      shortName: 'SEN',
      logo: getTeamBadgeSvg('IND', '#FF9933', '#000080'),
      score: undefined
    },
    team2: {
      name: 'Viktor Axelsen (DEN)',
      shortName: 'AXE',
      logo: getTeamBadgeSvg('DEN', '#C8102E', '#FFFFFF'),
      score: undefined
    },
    status: 'upcoming',
    statusText: 'Starts Friday at 6:00 PM IST',
    startTimeIST: 'Friday, 17 Oct 2026, 6:00 PM IST',
    venue: 'Utilita Arena Birmingham, UK',
    hasOfficialStream: true,
    officialBroadcaster: {
      name: 'JioCinema & Sports18',
      url: 'https://www.jiocinema.com',
      logo: 'JioCinema'
    }
  },
  {
    id: 'ipl-rr-srh-finished',
    sport: 'cricket',
    tournament: 'TATA IPL 2026',
    matchNumber: 'Match 33 of 74',
    team1: {
      name: 'Rajasthan Royals',
      shortName: 'RR',
      logo: getTeamBadgeSvg('RR', '#EA1B85', '#254AA5'),
      score: '214/5 (20.0 ov)'
    },
    team2: {
      name: 'Sunrisers Hyderabad',
      shortName: 'SRH',
      logo: getTeamBadgeSvg('SRH', '#F26522', '#000000'),
      score: '210/8 (20.0 ov)'
    },
    status: 'finished',
    statusText: 'RR won by 4 runs • Player of Match: Sanju Samson 88 (42)',
    startTimeIST: 'Yesterday, 7:30 PM IST',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    hasOfficialStream: false,
    officialBroadcaster: {
      name: 'JioCinema & Star Sports',
      url: 'https://www.jiocinema.com/sports',
      logo: 'JioCinema'
    }
  },
  {
    id: 'ucl-rma-bar-finished',
    sport: 'football',
    tournament: 'UEFA Champions League 2025-26',
    matchNumber: 'El Clasico • Quarter Final',
    team1: {
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: getTeamBadgeSvg('RMA', '#00529F', '#FEBE10'),
      score: '3'
    },
    team2: {
      name: 'FC Barcelona',
      shortName: 'BAR',
      logo: getTeamBadgeSvg('BAR', '#A50044', '#004D98'),
      score: '2'
    },
    status: 'finished',
    statusText: 'Real Madrid won 3-2 (Agg: 4-3) • Bellingham 90+2\'',
    startTimeIST: 'Yesterday, 12:30 AM IST',
    venue: 'Santiago Bernabéu, Madrid',
    hasOfficialStream: false,
    officialBroadcaster: {
      name: 'Sony LIV & Sony Ten 2',
      url: 'https://www.sonyliv.com',
      logo: 'SonyLIV'
    }
  }
];

export const STANDINGS_DATA: Record<string, TournamentStandings> = {
  ipl: {
    tournament: 'TATA Indian Premier League 2026',
    season: '2026 Season',
    sport: 'cricket',
    headers: ['Pos', 'Team', 'P', 'W', 'L', 'NR', 'Pts', 'NRR', 'Form'],
    rows: [
      { position: 1, team: 'Royal Challengers Bengaluru', shortName: 'RCB', logo: getTeamBadgeSvg('RCB', '#DA1919', '#EAA72A'), played: 9, won: 7, lost: 2, drawnOrNR: 0, points: 14, netRunRateOrGD: '+0.842', form: ['W', 'W', 'W', 'L', 'W'] },
      { position: 2, team: 'Kolkata Knight Riders', shortName: 'KKR', logo: getTeamBadgeSvg('KKR', '#3A225D', '#ECC542'), played: 9, won: 6, lost: 3, drawnOrNR: 0, points: 12, netRunRateOrGD: '+0.718', form: ['W', 'L', 'W', 'W', 'L'] },
      { position: 3, team: 'Chennai Super Kings', shortName: 'CSK', logo: getTeamBadgeSvg('CSK', '#FFD103', '#0047AB'), played: 9, won: 6, lost: 3, drawnOrNR: 0, points: 12, netRunRateOrGD: '+0.529', form: ['L', 'W', 'W', 'L', 'W'] },
      { position: 4, team: 'Rajasthan Royals', shortName: 'RR', logo: getTeamBadgeSvg('RR', '#EA1B85', '#254AA5'), played: 9, won: 5, lost: 4, drawnOrNR: 0, points: 10, netRunRateOrGD: '+0.312', form: ['W', 'L', 'W', 'L', 'W'] },
      { position: 5, team: 'Sunrisers Hyderabad', shortName: 'SRH', logo: getTeamBadgeSvg('SRH', '#F26522', '#000000'), played: 9, won: 5, lost: 4, drawnOrNR: 0, points: 10, netRunRateOrGD: '+0.198', form: ['L', 'W', 'L', 'W', 'W'] },
      { position: 6, team: 'Mumbai Indians', shortName: 'MI', logo: getTeamBadgeSvg('MI', '#004BA0', '#D1AB3E'), played: 8, won: 4, lost: 4, drawnOrNR: 0, points: 8, netRunRateOrGD: '+0.045', form: ['W', 'W', 'L', 'W', 'L'] },
      { position: 7, team: 'Lucknow Super Giants', shortName: 'LSG', logo: getTeamBadgeSvg('LSG', '#0057B8', '#FF6600'), played: 9, won: 4, lost: 5, drawnOrNR: 0, points: 8, netRunRateOrGD: '-0.142', form: ['L', 'L', 'W', 'L', 'W'] },
      { position: 8, team: 'Gujarat Titans', shortName: 'GT', logo: getTeamBadgeSvg('GT', '#1C2C5B', '#C9A050'), played: 9, won: 3, lost: 6, drawnOrNR: 0, points: 6, netRunRateOrGD: '-0.380', form: ['L', 'L', 'L', 'W', 'L'] },
      { position: 9, team: 'Delhi Capitals', shortName: 'DC', logo: getTeamBadgeSvg('DC', '#004C97', '#DC241F'), played: 9, won: 3, lost: 6, drawnOrNR: 0, points: 6, netRunRateOrGD: '-0.512', form: ['W', 'L', 'L', 'L', 'L'] },
      { position: 10, team: 'Punjab Kings', shortName: 'PBKS', logo: getTeamBadgeSvg('PBKS', '#ED1B24', '#D4AF37'), played: 9, won: 2, lost: 7, drawnOrNR: 0, points: 4, netRunRateOrGD: '-0.810', form: ['L', 'L', 'L', 'L', 'W'] }
    ]
  },
  isl: {
    tournament: 'Indian Super League 2025-26',
    season: 'League Stage',
    sport: 'football',
    headers: ['Pos', 'Club', 'P', 'W', 'D', 'L', 'Pts', 'GD', 'Form'],
    rows: [
      { position: 1, team: 'Mohun Bagan Super Giant', shortName: 'MBSG', logo: getTeamBadgeSvg('MB', '#155724', '#85144b'), played: 22, won: 15, lost: 4, drawnOrNR: 3, points: 48, netRunRateOrGD: '+21', form: ['W', 'W', 'D', 'W', 'W'] },
      { position: 2, team: 'Mumbai City FC', shortName: 'MCFC', logo: getTeamBadgeSvg('MCFC', '#0047AB', '#FFD700'), played: 22, won: 14, lost: 4, drawnOrNR: 4, points: 46, netRunRateOrGD: '+19', form: ['W', 'L', 'W', 'W', 'D'] },
      { position: 3, team: 'FC Goa', shortName: 'FCG', logo: getTeamBadgeSvg('FCG', '#FC5200', '#002B49'), played: 22, won: 13, lost: 5, drawnOrNR: 4, points: 43, netRunRateOrGD: '+14', form: ['D', 'W', 'W', 'L', 'W'] },
      { position: 4, team: 'Kerala Blasters FC', shortName: 'KBFC', logo: getTeamBadgeSvg('KBFC', '#FEE200', '#0047AB'), played: 22, won: 11, lost: 8, drawnOrNR: 3, points: 36, netRunRateOrGD: '+5', form: ['L', 'W', 'W', 'D', 'L'] },
      { position: 5, team: 'Bengaluru FC', shortName: 'BFC', logo: getTeamBadgeSvg('BFC', '#0047AB', '#E31B23'), played: 22, won: 10, lost: 9, drawnOrNR: 3, points: 33, netRunRateOrGD: '+3', form: ['W', 'D', 'L', 'W', 'D'] },
      { position: 6, team: 'Odisha FC', shortName: 'OFC', logo: getTeamBadgeSvg('OFC', '#000000', '#85144b'), played: 22, won: 9, lost: 9, drawnOrNR: 4, points: 31, netRunRateOrGD: '+1', form: ['L', 'D', 'W', 'L', 'W'] }
    ]
  },
  premier_league: {
    tournament: 'Premier League 2025-26',
    season: 'Matchweek 30',
    sport: 'football',
    headers: ['Pos', 'Club', 'P', 'W', 'D', 'L', 'Pts', 'GD', 'Form'],
    rows: [
      { position: 1, team: 'Arsenal', shortName: 'ARS', logo: getTeamBadgeSvg('ARS', '#EF0107', '#063672'), played: 30, won: 22, lost: 3, drawnOrNR: 5, points: 71, netRunRateOrGD: '+44', form: ['W', 'W', 'W', 'D', 'W'] },
      { position: 2, team: 'Manchester City', shortName: 'MCI', logo: getTeamBadgeSvg('MCI', '#6CABDD', '#1C2C5B'), played: 29, won: 21, lost: 4, drawnOrNR: 4, points: 67, netRunRateOrGD: '+41', form: ['W', 'W', 'D', 'W', 'W'] },
      { position: 3, team: 'Liverpool', shortName: 'LIV', logo: getTeamBadgeSvg('LIV', '#C8102E', '#00B2A9'), played: 30, won: 20, lost: 5, drawnOrNR: 5, points: 65, netRunRateOrGD: '+36', form: ['L', 'W', 'W', 'W', 'D'] },
      { position: 4, team: 'Aston Villa', shortName: 'AVL', logo: getTeamBadgeSvg('AVL', '#670E36', '#95BFE5'), played: 30, won: 18, lost: 7, drawnOrNR: 5, points: 59, netRunRateOrGD: '+20', form: ['W', 'D', 'W', 'L', 'W'] }
    ]
  }
};
