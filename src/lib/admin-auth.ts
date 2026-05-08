import 'server-only';

import crypto from 'node:crypto';

import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'aka_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || '';
}

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function assertAdminConfig() {
  if (!getAdminPassword() || !getAdminSecret()) {
    throw new Error('ADMIN_PASSWORD ve ADMIN_SESSION_SECRET ortam değişkenleri gerekli.');
  }
}

function signToken(payload: string) {
  const secret = getAdminSecret();
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

export function createAdminSessionCookieValue() {
  assertAdminConfig();

  const issuedAt = Date.now().toString();
  const payload = `${issuedAt}:${getAdminPassword()}`;
  const signature = signToken(payload);

  return `${issuedAt}.${signature}`;
}

export function verifyAdminSessionCookieValue(value?: string | null) {
  assertAdminConfig();

  if (!value) {
    return false;
  }

  const [issuedAtRaw, signature] = value.split('.');
  const issuedAt = Number(issuedAtRaw);

  if (!issuedAtRaw || !signature || Number.isNaN(issuedAt)) {
    return false;
  }

  if (Date.now() - issuedAt > SESSION_TTL_MS) {
    return false;
  }

  const expectedSignature = signToken(`${issuedAtRaw}:${getAdminPassword()}`);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function isAdminAuthenticated() {
  try {
    const cookieStore = await cookies();
    return verifyAdminSessionCookieValue(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  } catch {
    return false;
  }
}

export async function isAdminRequestAuthenticated(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|; )${ADMIN_COOKIE_NAME}=([^;]+)`));
    return verifyAdminSessionCookieValue(match?.[1]);
  } catch {
    return false;
  }
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000
  };
}
