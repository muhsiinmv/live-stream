import { NextResponse } from 'next/server';
import { sportsStore } from '@/lib/store';
import { Match } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const match = sportsStore.getMatchById(id);
  if (!match) {
    return NextResponse.json({ success: false, error: 'Match not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, match });
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body: Partial<Match> = await request.json();
    const existing = sportsStore.getMatchById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Match not found' }, { status: 404 });
    }

    const updated = sportsStore.addOrUpdateMatch({
      ...existing,
      ...body,
      id
    });

    return NextResponse.json({ success: true, match: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const deleted = sportsStore.deleteMatch(id);
  return NextResponse.json({ success: deleted });
}
