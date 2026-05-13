# FootballIntel - AI Betting Intelligence Platform

A high-performance, real-time football analysis and prediction platform built for elite sports intelligence.

## 🏗 Architecture Overview

FootballIntel is designed as a stateless, API-first application. It leverages high-speed data fetching and sophisticated heuristics to provide betting market insights.

### Core Engines

1.  **Prediction Engine (`lib/prediction-engine.ts`)**
    - Calculates probabilities for: Match Winner (1X2), Double Chance, Draw No Bet, BTTS, Over/Under (1.5/2.5), HT/FT, and Win Either Half.
    - Uses weighted form analysis, home advantage coefficients, and historical scoring distributions.

2.  **AI Reasoning Engine (`lib/ai-reasoning.ts`)**
    - Converts raw statistical data and news snippets into human-readable tactical analysis.
    - Generates confidence scores and risk assessments (LOW, MEDIUM, STRONG, ELITE).

3.  **Real-Time Search System (`lib/api-client.ts`)**
    - Integrates with Serper (Google Search API) to fetch live injury reports, lineup leaks, and manager comments.
    - Features a robust fallback mechanism to cached mock data to ensure 100% uptime.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Environment Variables & API Setup

To enable real-time data and live search, you need to obtain API keys from the following providers. Create a `.env.local` file in the root directory and add them as follows:

```env
# 1. Football-Data.org (Match results, standings, fixtures)
# Get it at: https://www.football-data.org/client/register
FOOTBALL_DATA_API_KEY=your_key

# 2. The Odds API (Bookmaker odds comparison)
# Get it at: https://the-odds-api.com/ (Free tier available)
ODDS_API_KEY=your_key

# 3. Serper.dev (Real-time Google search for injuries/news)
# Get it at: https://serper.dev/ (2,500 free queries on signup)
SERPER_API_KEY=your_key
```

#### How to get these keys:
1.  **Football-Data.org**: Visit the registration page, fill in your details, and you will receive an API key via email immediately.
2.  **The Odds API**: Register for a free account. They provide a generous free tier for match odds across all major leagues.
3.  **Serper.dev**: This is a fast Google Search API. Signing up gives you free credits (2,500 requests), which the AI uses to find real-time injury and lineup news.

*Note: If no keys are provided, the platform automatically switches to a high-quality **Mock Data Mode**, allowing you to test the full interface and analysis logic immediately.*

### Development
```bash
npm run dev
```

## 📈 Supported Leagues
- Premier League (PL)
- UEFA Champions League (CL)
- La Liga (PD)
- Bundesliga (BL1)
- Serie A (SA)
- And more via global API coverage.

## ⚖️ Disclaimer
This platform is an intelligence tool for information and research purposes only. **No actual betting or money handling takes place on this site.** Always gamble responsibly.
