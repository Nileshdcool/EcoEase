import * as admin from 'firebase-admin';

export function initializeFirebase(serviceAccount: any): void {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
