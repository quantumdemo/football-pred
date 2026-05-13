import { APIClient } from '@/lib/api-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const matches = await APIClient.getMatches();
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
