'use client';

import type { ContactFormInput } from '@/types/contact';

type ContactApiResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactForm(payload: ContactFormInput): Promise<ContactApiResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const rawBody = await response.text();
  let data: Partial<ContactApiResponse> = {};

  if (rawBody) {
    try {
      data = JSON.parse(rawBody) as ContactApiResponse;
    } catch {
      data = { message: rawBody };
    }
  }

  if (!response.ok) {
    return {
      ok: false,
      message: data.message || 'Talebiniz gönderilemedi.',
      fieldErrors: data.fieldErrors
    };
  }

  return {
    ok: true,
    message: data.message || 'Talebiniz alındı.',
    fieldErrors: data.fieldErrors
  };
}
