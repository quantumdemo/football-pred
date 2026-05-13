import { APIClient } from '@/lib/api-client';
import { PredictionEngine } from '@/lib/prediction-engine';
import { AIReasoningEngine } from '@/lib/ai-reasoning';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get('matchId');

  if (!matchId) {
    return NextResponse.json({ error: 'matchId is required' }, { status: 400 });
  }

  try {
    const matches = await APIClient.getMatches();
    const match = matches.find(m => m.id === matchId);

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    const odds = await APIClient.getOdds(matchId);
    const news = await APIClient.getNews([match.homeTeam.name, match.awayTeam.name]);

    const prediction = PredictionEngine.calculatePrediction(match, odds, news);
    const reasoning = AIReasoningEngine.generateReasoning(match, prediction, news);

    prediction.explanation = reasoning;

    return NextResponse.json({
      match,
      odds,
      news,
      prediction
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate prediction' }, { status: 500 });
  }
}
