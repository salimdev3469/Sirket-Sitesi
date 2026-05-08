import { NextResponse } from 'next/server';

import { createAdminSessionCookieValue, getAdminCookieName, getAdminCookieOptions } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };

    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { ok: false, message: 'Admin yapılandırması eksik.' },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, message: 'Geçersiz şifre.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true, message: 'Giriş başarılı.' });
    response.cookies.set(getAdminCookieName(), createAdminSessionCookieValue(), getAdminCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ ok: false, message: 'Giriş işlemi başarısız.' }, { status: 500 });
  }
}
