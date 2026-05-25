import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { data, error } = await adminClient
    .from('settings')
    .select('*');

  if (error) {
    console.error('[Supabase] GET settings failed:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  // Convert array of {key, value} to a single object
  const settings = data?.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {} as Record<string, string>) || {};

  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json(); // Expected: { key: string, value: string }
  const { key, value } = body;
  
  if (!key || value === undefined) {
    return NextResponse.json({ error: 'Key and value required' }, { status: 400 });
  }

  const { data, error } = await adminClient
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    console.error('[Supabase] PUT settings failed:', error);
    return NextResponse.json({ error: 'Failed to update setting', details: error }, { status: 500 });
  }

  return NextResponse.json({ setting: data });
}
