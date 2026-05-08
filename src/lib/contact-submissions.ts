import 'server-only';

import { Timestamp } from 'firebase-admin/firestore';

import { getContactCollectionName, getFirestoreDb } from '@/lib/firebase';
import type { ContactInboxItem } from '@/types/contact';

function toIsoString(value: unknown) {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (typeof value === 'string' && value) {
    return value;
  }

  return null;
}

export async function getContactSubmissions(limit = 20): Promise<ContactInboxItem[]> {
  try {
    const snapshot = await getFirestoreDb()
      .collection(getContactCollectionName())
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Record<string, unknown>;

      return {
        id: doc.id,
        name: String(data.name || ''),
        email: String(data.email || ''),
        company: data.company ? String(data.company) : undefined,
        phone: data.phone ? String(data.phone) : undefined,
        message: String(data.message || ''),
        source: 'website',
        createdAt: toIsoString(data.createdAt) || new Date().toISOString(),
        receivedAt: toIsoString(data.receivedAt)
      };
    });
  } catch {
    return [];
  }
}
