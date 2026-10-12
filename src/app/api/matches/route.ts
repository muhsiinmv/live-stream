import { NextResponse } from 'next/server';
import { sportsStore } from '@/lib/store';
import { Match } from '@/types';

export async function GET() {
  const matches = sportsStore.getMatches();
  return NextResponse.json({ success: true, count: matches.length, matches });
}

export async function POST(request: Request) {
  try {
    const body: Match = await request.json();
    if (!body.id || !body.team1?.name || !body.team2?.name) {
      return NextResponse.json({ success: false, error: 'Missing required match fields' }, { status: 400 });
    }

    const saved = sportsStore.addOrUpdateMatch(body);
    return NextResponse.json({ success: true, match: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
