import crypto from 'node:crypto';

import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getStorageBucket, getStorageBucketCandidates } from '@/lib/firebase';

export const runtime = 'nodejs';

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function buildPublicStorageUrl(bucketName: string, filePath: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media&token=${token}`;
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
    const bucketCandidates = getStorageBucketCandidates();

    if (bucketCandidates.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Firebase Storage bucket bilgisi oluşturulamadı. FIREBASE_STORAGE_BUCKET veya FIREBASE_PROJECT_ID ayarını kontrol edin.'
        },
        { status: 500 }
      );
    }

    let uploadedBucketName = '';
    let lastError: unknown = null;

    for (const bucketName of bucketCandidates) {
      try {
        const bucketFile = getStorageBucket(bucketName).file(filePath);
        await bucketFile.save(buffer, {
          metadata: {
            contentType: file.type,
            metadata: {
              firebaseStorageDownloadTokens: token
            }
          },
          resumable: false
        });
        uploadedBucketName = bucketName;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!uploadedBucketName) {
      throw lastError || new Error('Storage bucket bulunamadı');
    }

    return NextResponse.json({
      ok: true,
      message: 'Görsel yüklendi.',
      url: buildPublicStorageUrl(uploadedBucketName, filePath, token)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Görsel yüklenemedi.';

    if (/storage bucket|bucket|not found/i.test(message)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Firebase Storage bucket ayarı eksik veya hatalı. FIREBASE_STORAGE_BUCKET değerini kontrol edin ve Storage özelliğinin Firebase Console’da etkin olduğundan emin olun.'
        },
        { status: 500 }
      );
    }

    if (/permission|denied|service_disabled|not enabled|storage/i.test(message)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Firebase Storage erişimi reddedildi. Cloud Storage for Firebase ve ilgili API’lerin etkin olduğundan, ayrıca servis hesabının yazma yetkisine sahip olduğundan emin olun.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
