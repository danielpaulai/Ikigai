import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const maxDuration = 60

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB

/**
 * Accepts multipart/form-data with field `file` (application/pdf).
 * Uploads to Supabase Storage using the service role (server-only).
 * Create bucket `SUPABASE_STORAGE_BUCKET` in the Supabase dashboard first.
 */
export async function POST(req: NextRequest) {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET
  if (!bucket) {
    return NextResponse.json(
      { error: 'Storage is not configured. Set SUPABASE_STORAGE_BUCKET in the server environment.' },
      { status: 503 }
    )
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file field' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 })
  }

  const type = file.type || 'application/octet-stream'
  if (type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF uploads are allowed' }, { status: 400 })
  }

  const buf = Buffer.from(await file.arrayBuffer())
  const path = `reports/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.pdf`

  const supabase = createAdminSupabase()

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, buf, {
    contentType: 'application/pdf',
    upsert: false,
  })

  if (uploadError) {
    console.error('Supabase upload error:', uploadError)
    return NextResponse.json(
      { error: uploadError.message || 'Upload failed' },
      { status: 500 }
    )
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 60 * 24 * 7) // 7 days

  if (signError || !signed?.signedUrl) {
    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path)
    return NextResponse.json({
      path,
      url: pub.publicUrl,
      expiresIn: null as number | null,
    })
  }

  return NextResponse.json({
    path,
    url: signed.signedUrl,
    expiresIn: 60 * 60 * 24 * 7,
  })
}
