import { Match, League, Odds, NewsItem, Team } from '../types';

export const MOCK_LEAGUES: League[] = [
  { id: 'PL', name: 'Premier League', country: 'England', logo: 'https://crests.football-data.org/PL.png' },
  { id: 'CL', name: 'Champions League', country: 'Europe', logo: 'https://crests.football-data.org/CL.png' },
  { id: 'BL1', name: 'Bundesliga', country: 'Germany', logo: 'https://crests.football-data.org/BL1.png' },
  { id: 'PD', name: 'La Liga', country: 'Spain', logo: 'https://crests.football-data.org/PD.png' },
  { id: 'SA', name: 'Serie A', country: 'Italy', logo: 'https://crests.football-data.org/SA.png' },
];

export const MOCK_TEAMS: Record<string, Team> = {
  'ARS': { id: 'ARS', name: 'Arsenal FC', shortName: 'Arsenal', logo: 'https://crests.football-data.org/57.png', form: ['W', 'W', 'D', 'W', 'L'] },
  'CHE': { id: 'CHE', name: 'Chelsea FC', shortName: 'Chelsea', logo: 'https://crests.football-data.org/61.png', form: ['D', 'W', 'L', 'W', 'D'] },
  'LIV': { id: 'LIV', name: 'Liverpool FC', shortName: 'Liverpool', logo: 'https://crests.football-data.org/64.png', form: ['W', 'W', 'W', 'D', 'W'] },
  'MCI': { id: 'MCI', name: 'Manchester City FC', shortName: 'Man City', logo: 'https://crests.football-data.org/65.png', form: ['W', 'L', 'W', 'W', 'W'] },
  'RMA': { id: 'RMA', name: 'Real Madrid CF', shortName: 'Real Madrid', logo: 'https://crests.football-data.org/86.png', form: ['W', 'W', 'W', 'W', 'D'] },
  'BAR': { id: 'BAR', name: 'FC Barcelona', shortName: 'Barcelona', logo: 'https://crests.football-data.org/81.png', form: ['W', 'W', 'L', 'W', 'W'] },
};

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    leagueId: 'PL',
    utcDate: new Date(Date.now() + 3600000 * 4).toISOString(), // 4 hours from now
    status: 'SCHEDULED',
    homeTeam: MOCK_TEAMS['ARS'],
    awayTeam: MOCK_TEAMS['CHE'],
  },
  {
    id: 'm2',
    leagueId: 'PD',
    utcDate: new Date(Date.now() + 3600000 * 24).toISOString(), // tomorrow
    status: 'SCHEDULED',
    homeTeam: MOCK_TEAMS['RMA'],
    awayTeam: MOCK_TEAMS['BAR'],
  },
  {
    id: 'm3',
    leagueId: 'PL',
    utcDate: new Date(Date.now() - 3600000 * 1).toISOString(), // started 1 hour ago
    status: 'LIVE',
    homeTeam: MOCK_TEAMS['MCI'],
    awayTeam: MOCK_TEAMS['LIV'],
    score: {
      fullTime: { home: 1, away: 1 },
      halfTime: { home: 0, away: 0 }
    }
  }
];

export const MOCK_ODDS: Record<string, Odds[]> = {
  'm1': [
    { homeWin: 1.75, draw: 3.80, awayWin: 4.50, bttsYes: 1.70, bttsNo: 2.10, over25: 1.80, under25: 2.00, bookmaker: 'SportyBet' },
    { homeWin: 1.72, draw: 3.85, awayWin: 4.60, bttsYes: 1.72, bttsNo: 2.05, over25: 1.82, under25: 1.95, bookmaker: 'Bet9ja' },
  ],
  'm2': [
    { homeWin: 2.10, draw: 3.50, awayWin: 3.20, bttsYes: 1.55, bttsNo: 2.40, over25: 1.65, under25: 2.20, bookmaker: 'SportyBet' },
  ]
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Arsenal injury boost as captain returns',
    summary: 'Martin Odegaard was spotted in full training ahead of the Chelsea clash, providing a massive boost for Arteta.',
    source: 'The Athletic',
    url: '#',
    publishedAt: new Date().toISOString(),
    tags: ['Arsenal', 'Injuries']
  },
  {
    id: 'n2',
    title: 'Chelsea defender ruled out for 3 weeks',
    summary: 'Reece James has suffered a minor hamstring strain and will miss the upcoming London derby.',
    source: 'BBC Sport',
    url: '#',
    publishedAt: new Date().toISOString(),
    tags: ['Chelsea', 'Injuries']
  }
];
