export type League = {
  id: string;
  name: string;
  country: string;
  logo: string;
};

export type Team = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  form?: string[]; // e.g., ['W', 'D', 'L', 'W', 'W']
};

export type Match = {
  id: string;
  leagueId: string;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'SUSPENDED' | 'CANCELLED';
  homeTeam: Team;
  awayTeam: Team;
  score?: {
    fullTime: { home: number; away: number };
    halfTime: { home: number; away: number };
  };
};

export type Odds = {
  homeWin: number;
  draw: number;
  awayWin: number;
  bttsYes: number;
  bttsNo: number;
  over25: number;
  under25: number;
  bookmaker: string;
};

export type Prediction = {
  matchId: string;
  winProbability: {
    home: number;
    draw: number;
    away: number;
  };
  marketPredictions: {
    market: string;
    value: string;
    probability: number;
    isSafe: boolean;
  }[];
  safestBet: string;
  confidence: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'STRONG' | 'ELITE';
  explanation: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  tags: string[];
};
