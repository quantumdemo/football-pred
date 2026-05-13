import { Match, Odds, Prediction, NewsItem } from '../types';

export class PredictionEngine {
  static calculatePrediction(match: Match, _odds: Odds[], news: NewsItem[]): Prediction {
    // 1. Calculate base win probabilities from form
    const homeFormWeight = this.calculateFormWeight(match.homeTeam.form || []);
    const awayFormWeight = this.calculateFormWeight(match.awayTeam.form || []);

    const totalWeight = homeFormWeight + awayFormWeight;
    let homeProb = (homeFormWeight / totalWeight) * 100;
    let awayProb = (awayFormWeight / totalWeight) * 100;

    // Adjust for home advantage (historically ~10%)
    homeProb += 5;
    awayProb -= 5;

    // Calculate draw (remaining probability)
    const drawProb = 100 - homeProb - awayProb;

    // 2. Determine market predictions
    const marketPredictions = [
      {
        market: 'Match Winner (1X2)',
        value: homeProb > awayProb ? '1' : awayProb > homeProb ? '2' : 'X',
        probability: Math.round(Math.max(homeProb, awayProb, drawProb)),
        isSafe: Math.max(homeProb, awayProb) > 65
      },
      {
        market: 'Double Chance',
        value: homeProb > awayProb ? '1X' : 'X2',
        probability: Math.round(homeProb + drawProb > awayProb + drawProb ? homeProb + drawProb : awayProb + drawProb),
        isSafe: true
      },
      {
        market: 'Draw No Bet',
        value: homeProb > awayProb ? '1' : '2',
        probability: Math.round((homeProb / (homeProb + awayProb)) * 100),
        isSafe: Math.max(homeProb, awayProb) > 60
      },
      {
        market: 'BTTS',
        value: 'Yes',
        probability: Math.round(Math.min(95, 40 + (homeProb * 0.4) + (awayProb * 0.4))),
        isSafe: false
      },
      {
        market: 'Over 1.5',
        value: 'Yes',
        probability: Math.round(Math.min(98, 50 + (homeProb * 0.5) + (awayProb * 0.4))),
        isSafe: true
      },
      {
        market: 'Over 2.5',
        value: 'Yes',
        probability: Math.round(Math.min(90, 30 + (homeProb * 0.5) + (awayProb * 0.5))),
        isSafe: false
      },
      {
        market: 'HT/FT',
        value: homeProb > awayProb ? '1/1' : '2/2',
        probability: Math.round(Math.max(homeProb, awayProb) * 0.7),
        isSafe: false
      },
      {
        market: 'Win Either Half',
        value: homeProb > awayProb ? 'Home' : 'Away',
        probability: Math.round(Math.max(homeProb, awayProb) * 0.85),
        isSafe: true
      }
    ];

    // 3. Select safest bet
    const safeBets = marketPredictions.filter(p => p.isSafe).sort((a, b) => b.probability - a.probability);
    const safestBet = safeBets.length > 0 ? `${safeBets[0].market}: ${safeBets[0].value}` : 'Double Chance Home/Draw';

    // 4. Calculate confidence
    const confidence = Math.min(95, Math.max(50, (homeProb > awayProb ? homeProb : awayProb) + 15));

    return {
      matchId: match.id,
      winProbability: {
        home: Math.round(homeProb),
        draw: Math.round(drawProb),
        away: Math.round(awayProb)
      },
      marketPredictions,
      safestBet,
      confidence: Math.round(confidence),
      riskLevel: this.getRiskLevel(confidence),
      explanation: "Generated based on recent form, home advantage, and statistical trends."
    };
  }

  private static calculateFormWeight(form: string[]): number {
    if (form.length === 0) return 10;
    return form.reduce((acc, result) => {
      if (result === 'W') return acc + 3;
      if (result === 'D') return acc + 1;
      return acc;
    }, 0);
  }

  private static getRiskLevel(confidence: number): 'LOW' | 'MEDIUM' | 'STRONG' | 'ELITE' {
    if (confidence >= 90) return 'ELITE';
    if (confidence >= 80) return 'STRONG';
    if (confidence >= 66) return 'MEDIUM';
    return 'LOW';
  }
}
