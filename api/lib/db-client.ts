import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  // For production deployment, use environment variables
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } else {
    // For local development, use service account file
    const serviceAccount = require('../tarteel-key.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
}

export const DbClient = admin.firestore();
