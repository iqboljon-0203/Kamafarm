import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    // Read current
    const { data } = await adminClient
      .from('settings')
      .select('value')
      .eq('key', 'site_visits')
      .single();

    const currentVisits = parseInt(data?.value || '0', 10);
    const newVisits = currentVisits + 1;

    // Update
    await adminClient
      .from('settings')
      .upsert({ key: 'site_visits', value: String(newVisits), updated_at: new Date().toISOString() });

    return NextResponse.json({ success: true, visits: newVisits });
  } catch (error) {
    console.error('[API Visits] Error tracking visit:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}
