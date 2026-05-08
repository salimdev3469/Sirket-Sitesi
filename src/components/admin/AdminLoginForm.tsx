'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const rawBody = await response.text();
    let data: { ok?: boolean; message?: string } = {};

    if (rawBody) {
      try {
        data = JSON.parse(rawBody) as { ok?: boolean; message?: string };
      } catch {
        data = { message: rawBody };
      }
    }

    if (!response.ok) {
      setMessage(data.message || 'Giriş başarısız.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="site-container flex min-h-screen items-center justify-center py-16">
      <form onSubmit={onSubmit} className="card-shell w-full max-w-md space-y-5 p-8">
        <div>
          <p className="text-label-md uppercase text-subtle">Admin Girişi</p>
          <h1 className="mt-2 text-headline-lg text-primary">AKA Yazılım Paneli</h1>
        </div>
        <label className="flex flex-col gap-2 text-label-md text-primary">
          Şifre
          <input
            type="password"
            className="rounded border border-border px-4 py-3 text-body-md outline-none focus:border-primary"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {message ? <p className="text-body-md text-muted">{message}</p> : null}
        <button type="submit" className="primary-button w-full" disabled={loading}>
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
}
