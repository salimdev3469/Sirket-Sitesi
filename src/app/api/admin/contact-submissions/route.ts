import { NextResponse } from 'next/server';

import { isAdminRequestAuthenticated } from '@/lib/admin-auth';
import { getContactSubmissions } from '@/lib/contact-submissions';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.json({ ok: false, message: 'Yetkisiz' }, { status: 401 });
  }

  const messages = await getContactSubmissions();

  return NextResponse.json({
    ok: true,
    message: messages.length > 0 ? 'Mesajlar yüklendi.' : 'Henüz mesaj yok.',
    messages
  });
}
