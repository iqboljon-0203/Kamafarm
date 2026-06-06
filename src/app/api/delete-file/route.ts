import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function DELETE(req: NextRequest) {
  try {
    // 1. Authenticate Request
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminClient = getSupabaseAdmin();
    if (!adminClient) {
      return NextResponse.json({ error: 'Database client not configured' }, { status: 500 });
    }

    const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse URL
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');

    if (!fileUrl) {
      return NextResponse.json({ error: 'No file URL provided' }, { status: 400 });
    }

    // 3. Extract bucket and path
    // Supabase public URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const publicUrlPart = '/storage/v1/object/public/';
    const publicIndex = fileUrl.indexOf(publicUrlPart);

    if (publicIndex === -1) {
      return NextResponse.json({ error: 'Invalid Supabase storage URL' }, { status: 400 });
    }

    const pathAfterPublic = fileUrl.substring(publicIndex + publicUrlPart.length);
    const pathParts = pathAfterPublic.split('/');
    
    if (pathParts.length < 2) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const bucketName = pathParts[0];
    const filePath = pathParts.slice(1).join('/');

    // 4. Delete file
    const { error: deleteError } = await adminClient.storage
      .from(bucketName)
      .remove([filePath]);

    if (deleteError) {
      console.error('[Delete File API] Error deleting file:', deleteError);
      return NextResponse.json({ error: 'Storage delete failed', details: deleteError }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (err: any) {
    console.error('[Delete File API] Server Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
