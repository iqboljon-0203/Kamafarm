import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  // Check if request is triggered by Vercel Cron
  const isCron = req.headers.get('x-vercel-cron') === '1';
  const isDev = process.env.NODE_ENV === 'development';

  if (!isCron && !isDev) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Database client not configured' }, { status: 500 });
  }

  try {
    // Perform a simple query to keep Supabase project active
    const { data, error } = await adminClient
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase project kept active successfully',
      timestamp: new Date().toISOString(),
      pingedRows: data?.length || 0,
    });
  } catch (err: any) {
    console.error('[Cron Keep-Alive] Error querying Supabase:', err);
    return NextResponse.json(
      { success: false, error: err.message || err },
      { status: 500 }
    );
  }
}
