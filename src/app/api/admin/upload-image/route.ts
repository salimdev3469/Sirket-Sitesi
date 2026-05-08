import crypto from 'node:crypto';

import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getStorageBucket, getStorageBucketName } from '@/lib/firebase';

export const runtime = 'nodejs';

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function buildPublicStorageUrl(filePath: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${getStorageBucketName()}/o/${encodeURIComponent(filePath)}?alt=media&token=${token}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: 'Yetkisiz' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') || 'site-content');

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, message: 'Dosya bulunamadı.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ ok: false, message: 'Sadece görsel dosyaları yüklenebilir.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const token = crypto.randomUUID().replace(/-/g, '');
    const filePath = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`;
    const bucketFile = getStorageBucket().file(filePath);

    await bucketFile.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: token
        }
      },
      resumable: false
    });

    return NextResponse.json({
      ok: true,
      message: 'Görsel yüklendi.',
      url: buildPublicStorageUrl(filePath, token)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Görsel yüklenemedi.';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
