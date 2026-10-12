import { NextResponse } from 'next/server';
import { sportsStore } from '@/lib/store';
import { SiteSettings } from '@/types';

export async function GET() {
  const settings = sportsStore.getSettings();
  // Don't leak adminPin in public response
  const { adminPin, ...safeSettings } = settings;
  return NextResponse.json({ success: true, settings: safeSettings });
}

export async function POST(request: Request) {
  try {
    const body: { pin: string; settings: Partial<SiteSettings> } = await request.json();
    const currentSettings = sportsStore.getSettings();

    // Verify PIN
    if (body.pin !== currentSettings.adminPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
    }

    const updated = sportsStore.updateSettings(body.settings);
    const { adminPin, ...safeSettings } = updated;
    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
