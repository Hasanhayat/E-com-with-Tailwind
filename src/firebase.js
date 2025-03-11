import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAYSx7e644npoGgjqdm6GkVTY3G-EKvc2A",
  authDomain: "khattak-store.firebaseapp.com",
  projectId: "khattak-store",
  storageBucket: "khattak-store.firebasestorage.app",
  messagingSenderId: "133398398632",
  appId: "1:133398398632:web:e2364db10ae1eff6c9a49d",
  measurementId: "G-P5GP0FVK4K"
};

// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: 'diuztua2d',
  uploadPreset: 'khattak-store'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 