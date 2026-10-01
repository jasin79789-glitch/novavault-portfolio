import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let firebaseStorage = null;

export const initFirebase = (config) => {
  if (firebaseApp) return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth, storage: firebaseStorage };

  const validConfig = config || {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  if (validConfig.apiKey && validConfig.projectId) {
    firebaseApp = getApps().length === 0 ? initializeApp(validConfig) : getApps()[0];
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
    return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth, storage: firebaseStorage };
  }
  return null;
};
