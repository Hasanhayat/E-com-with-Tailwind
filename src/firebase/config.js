import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAYSx7e644npoGgjqdm6GkVTY3G-EKvc2A",
  authDomain: "khattak-store.firebaseapp.com",
  projectId: "khattak-store",
  storageBucket: "khattak-store.firebasestorage.app",
  messagingSenderId: "133398398632",
  appId: "1:133398398632:web:e2364db10ae1eff6c9a49d",
  measurementId: "G-P5GP0FVK4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app); 