import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getSiteContent, saveSiteContent } from '@/lib/site-content';
import type { SiteContent } from '@/types/site-content';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: 'Yetkisiz' }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json({ ok: true, content });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: 'Yetkisiz' }, { status: 401 });
  }

  const body = (await request.json()) as { content?: SiteContent };

  if (!body.content) {
    return NextResponse.json({ ok: false, message: 'İçerik eksik.' }, { status: 400 });
  }

  await saveSiteContent(body.content);

  return NextResponse.json({ ok: true, message: 'İçerik güncellendi.' });
}
