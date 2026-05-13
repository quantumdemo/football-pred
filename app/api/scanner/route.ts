import { APIClient } from '@/lib/api-client';
import { PredictionEngine } from '@/lib/prediction-engine';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const matches = await APIClient.getMatches();
    const scheduledMatches = matches.filter(m => m.status === 'SCHEDULED');

    const scannedPredictions = await Promise.all(
      scheduledMatches.slice(0, 10).map(async (match) => {
        const odds = await APIClient.getOdds(match.id);
        const prediction = PredictionEngine.calculatePrediction(match, odds, []);
        return { match, prediction };
      })
    );

    const bestBets = scannedPredictions
      .filter(p => p.prediction.confidence > 75)
      .sort((a, b) => b.prediction.confidence - a.prediction.confidence);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      bestBets
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scan matches' }, { status: 500 });
  }
}
