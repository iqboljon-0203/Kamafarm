import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage, formatLeadMessage } from '@/lib/telegram';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, company, source } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const adminClient = getSupabaseAdmin();
    let leadId = null;

    if (adminClient) {
      const { data, error } = await adminClient
        .from('leads')
        .insert([{
          name, 
          phone, 
          company: company || null, 
          source: source || 'website', 
          status: 'new'
        }])
        .select()
        .single();
        
      if (error) {
        console.error('[Supabase] Insert failed:', error);
      } else if (data) {
        leadId = data.id;
      }
    }

    // Send Telegram notification
    await sendTelegramMessage(formatLeadMessage({ name, phone, company, source }));

    return NextResponse.json({ success: true, id: leadId });
  } catch (err) {
    console.error('[API /leads] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await adminClient
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] GET leads failed:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ leads: data || [] });
}

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  if (adminClient) {
    const { error } = await adminClient
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('[Supabase] PATCH lead failed:', error);
      return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
