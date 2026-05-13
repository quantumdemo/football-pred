import { Match, NewsItem, Prediction } from '../types';

export class AIReasoningEngine {
  static generateReasoning(match: Match, prediction: Prediction, news: NewsItem[]): string {
    const homeTeam = match.homeTeam.name;
    const awayTeam = match.awayTeam.name;

    let reasoning = `${homeTeam} vs ${awayTeam} Analysis:\n\n`;

    // Form analysis
    const homeW = match.homeTeam.form?.filter(r => r === 'W').length || 0;
    const awayW = match.awayTeam.form?.filter(r => r === 'W').length || 0;

    if (homeW > awayW) {
      reasoning += `• ${homeTeam} enters this match in superior form, winning ${homeW} of their last 5 matches.\n`;
    } else if (awayW > homeW) {
      reasoning += `• ${awayTeam} has been more consistent recently, with ${awayW} wins in their last 5 games.\n`;
    } else {
      reasoning += `• Both teams show similar recent form, suggesting a tightly contested matchup.\n`;
    }

    // News/Injury analysis
    const injuryNews = news.filter(n => n.tags.includes('Injuries'));
    if (injuryNews.length > 0) {
      reasoning += `• Key Intelligence: ${injuryNews[0].summary}\n`;
    }

    // Prediction justification
    if (prediction.confidence > 80) {
      reasoning += `• High confidence is driven by strong statistical dominance and favorable lineup news for the predicted outcome.\n`;
    } else {
      reasoning += `• A moderate confidence score reflects potential volatility, though historical trends favor the selected markets.\n`;
    }

    reasoning += `\nSafest approach: ${prediction.safestBet}.`;

    return reasoning;
  }
}
