import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
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

    // Validate the token using Supabase admin client
    const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse uploaded file from FormData
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Ensure Storage Bucket exists and is public
    const bucketName = 'logos';
    const { data: buckets, error: listError } = await adminClient.storage.listBuckets();
    
    if (listError) {
      console.error('[Upload API] Error listing buckets:', listError);
    }

    const bucketExists = buckets?.some((b) => b.name === bucketName);
    if (!bucketExists) {
      console.log(`[Upload API] Bucket "${bucketName}" not found. Creating public bucket...`);
      const { error: createError } = await adminClient.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB limit
      });

      if (createError) {
        console.error('[Upload API] Error creating bucket:', createError);
        return NextResponse.json({ error: 'Failed to initialize storage bucket' }, { status: 500 });
      }
    }

    // 4. Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await adminClient.storage
      .from(bucketName)
      .upload(fileName, Buffer.from(fileBuffer), {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('[Upload API] Error uploading file to storage:', uploadError);
      return NextResponse.json({ error: 'Storage upload failed', details: uploadError }, { status: 500 });
    }

    // 5. Retrieve public URL
    const { data: { publicUrl } } = adminClient.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
    });
  } catch (err: any) {
    console.error('[Upload API] Server Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
