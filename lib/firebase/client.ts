'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

export function getFirebaseApp(): FirebaseApp | undefined {
  if (typeof window === 'undefined') return undefined;

  if (!firebaseConfig.apiKey) {
    console.warn('Firebase config not found. Auth features will be disabled.');
    return undefined;
  }

  if (!app && getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else if (!app) {
    app = getApps()[0];
  }

  return app;
}

export function getFirebaseAuth(): Auth | undefined {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return undefined;

  if (!auth) {
    auth = getAuth(firebaseApp);
  }

  return auth;
}

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export async function signInWithGoogle() {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) throw new Error('Firebase not initialized');
  return signInWithPopup(firebaseAuth, googleProvider);
}

export async function signInWithFacebook() {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) throw new Error('Firebase not initialized');
  return signInWithPopup(firebaseAuth, facebookProvider);
}

export async function signInWithTwitter() {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) throw new Error('Firebase not initialized');
  return signInWithPopup(firebaseAuth, twitterProvider);
}

export async function signInWithEmail(email: string, password: string) {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) throw new Error('Firebase not initialized');
  return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export async function signUpWithEmail(email: string, password: string) {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) throw new Error('Firebase not initialized');
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export function setupRecaptcha(containerId: string): RecaptchaVerifier | null {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) return null;

  return new RecaptchaVerifier(firebaseAuth, containerId, {
    size: 'normal',
    callback: () => {
      // reCAPTCHA solved
    },
  });
}

export async function signInWithPhone(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) throw new Error('Firebase not initialized');
  return signInWithPhoneNumber(firebaseAuth, phoneNumber, recaptchaVerifier);
}

export async function signOut() {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) return;
  return firebaseSignOut(firebaseAuth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(firebaseAuth, callback);
}

export async function getIdToken(): Promise<string | null> {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth?.currentUser) return null;
  return firebaseAuth.currentUser.getIdToken();
}

export type { User };
