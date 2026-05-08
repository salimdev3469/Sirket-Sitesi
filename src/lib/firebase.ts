import 'server-only';

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'] as const;

function assertFirebaseEnv() {
  const missingKeys = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Eksik Firebase ortam değişkenleri: ${missingKeys.join(', ')}. İletişim isteklerini göndermeden önce .env.local dosyanızı güncelleyin.`
    );
  }
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  assertFirebaseEnv();

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

export function getFirestoreDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getContactCollectionName() {
  return process.env.FIREBASE_CONTACT_COLLECTION || 'contact_submissions';
}

export function getStorageBucketName() {
  const explicitBucket = process.env.FIREBASE_STORAGE_BUCKET?.trim();

  if (explicitBucket) {
    return explicitBucket;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  return `${projectId}.firebasestorage.app`;
}

export function getStorageBucketCandidates() {
  const explicitBucket = process.env.FIREBASE_STORAGE_BUCKET?.trim();
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();

  if (explicitBucket) {
    return [explicitBucket];
  }

  if (!projectId) {
    return [];
  }

  return [`${projectId}.firebasestorage.app`, `${projectId}.appspot.com`];
}

export function getStorageBucket(bucketName?: string) {
  return getStorage(getFirebaseAdminApp()).bucket(bucketName || getStorageBucketName());
}
