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
  return process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
}

export function getStorageBucket() {
  return getStorage(getFirebaseAdminApp()).bucket(getStorageBucketName());
}
