import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

import { getContactCollectionName, getFirestoreDb } from '@/lib/firebase';
import { contactSchema } from '@/lib/validations';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const path = String(issue.path[0] ?? 'form');
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }

      return NextResponse.json(
        {
          ok: false,
          message: 'Lütfen form alanlarını kontrol edin.',
          fieldErrors
        },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    await getFirestoreDb()
      .collection(getContactCollectionName())
      .add({
        ...payload,
        company: payload.company || null,
        phone: payload.phone || null,
        source: 'website',
        createdAt: FieldValue.serverTimestamp(),
        receivedAt: new Date().toISOString()
      });

    return NextResponse.json({
      ok: true,
      message: 'Talebiniz başarıyla gönderildi.'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen sunucu hatası';

    return NextResponse.json(
      {
        ok: false,
        message
      },
      { status: 500 }
    );
  }
}
