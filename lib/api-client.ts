import { MOCK_MATCHES, MOCK_ODDS, MOCK_NEWS } from './mock-data';
import { Match, Odds, NewsItem } from '../types';

const FOOTBALL_DATA_API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const ODDS_API_KEY = process.env.ODDS_API_KEY;

export class APIClient {
  static async getMatches(): Promise<Match[]> {
    if (!FOOTBALL_DATA_API_KEY) {
      console.log('Using mock data for matches');
      return MOCK_MATCHES;
    }

    try {
      const response = await fetch('https://api.football-data.org/v4/matches', {
        headers: { 'X-Auth-Token': FOOTBALL_DATA_API_KEY }
      });
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      return data.matches.map((m: {
        id: number;
        competition: { code: string };
        utcDate: string;
        status: string;
        homeTeam: { id: number; name: string; shortName: string; crest: string };
        awayTeam: { id: number; name: string; shortName: string; crest: string };
        score: {
          fullTime: { home: number | null; away: number | null };
          halfTime: { home: number | null; away: number | null };
        };
      }) => ({
        id: m.id.toString(),
        leagueId: m.competition.code,
        utcDate: m.utcDate,
        status: m.status,
        homeTeam: {
          id: m.homeTeam.id.toString(),
          name: m.homeTeam.name,
          shortName: m.homeTeam.shortName || m.homeTeam.name,
          logo: m.homeTeam.crest
        },
        awayTeam: {
          id: m.awayTeam.id.toString(),
          name: m.awayTeam.name,
          shortName: m.awayTeam.shortName || m.awayTeam.name,
          logo: m.awayTeam.crest
        },
        score: m.score
      }));
    } catch (error) {
      console.error('Error fetching matches:', error);
      return MOCK_MATCHES;
    }
  }

  static async getOdds(matchId: string): Promise<Odds[]> {
    if (!ODDS_API_KEY) {
      console.log('Using mock data for odds');
      return MOCK_ODDS[matchId] || MOCK_ODDS['m1'];
    }

    try {
      // In a real app, we would map matchId to Odds API match ID
      const response = await fetch(`https://api.the-odds-api.com/v4/sports/soccer/odds?apiKey=${ODDS_API_KEY}&regions=uk,eu&markets=h2h,totals,btts`);
      if (!response.ok) throw new Error('Odds API request failed');
      const data = await response.json();
      // Implementation of mapping would go here
      return MOCK_ODDS[matchId] || MOCK_ODDS['m1'];
    } catch (error) {
      console.error('Error fetching odds:', error);
      return MOCK_ODDS[matchId] || MOCK_ODDS['m1'];
    }
  }

  static async getNews(teamNames: string[]): Promise<NewsItem[]> {
    const SERPER_API_KEY = process.env.SERPER_API_KEY;

    if (SERPER_API_KEY) {
      try {
        const query = `${teamNames.join(' vs ')} football injuries news lineup`;
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': SERPER_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ q: query })
        });
        const data = await response.json();

        return data.organic.slice(0, 3).map((item: { title: string; snippet: string; link: string }, i: number) => ({
          id: `news-${i}`,
          title: item.title,
          summary: item.snippet,
          source: item.link.split('/')[2],
          url: item.link,
          publishedAt: new Date().toISOString(),
          tags: ['Real-time', 'Search']
        }));
      } catch (error) {
        console.error('Serper search failed, falling back to mock news:', error);
      }
    }

    // Fallback to enhanced mock news logic
    return MOCK_NEWS.filter(n =>
      teamNames.some(name =>
        n.title.toLowerCase().includes(name.toLowerCase()) ||
        n.summary.toLowerCase().includes(name.toLowerCase()) ||
        n.tags.some(t => name.toLowerCase().includes(t.toLowerCase()))
      )
    );
  }
}
