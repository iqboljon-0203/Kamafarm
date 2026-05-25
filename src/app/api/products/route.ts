import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { data, error } = await adminClient
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] GET products failed:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ products: data || [] });
}

export async function POST(req: NextRequest) {
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

  const body = await req.json();

  const { data, error } = await adminClient
    .from('products')
    .insert([body])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] POST product failed:', error);
    return NextResponse.json({ error: 'Failed to create product', details: error }, { status: 500 });
  }

  return NextResponse.json({ product: data });
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

  const body = await req.json();
  const { id, ...updates } = body;
  
  if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

  const { data, error } = await adminClient
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] PUT product failed:', error);
    return NextResponse.json({ error: 'Failed to update product', details: error }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(req: NextRequest) {
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

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

  const { error } = await adminClient
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] DELETE product failed:', error);
    return NextResponse.json({ error: 'Failed to delete product', details: error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
