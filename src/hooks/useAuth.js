import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || userData?.name,
          role: userData?.role || 'user',
          ...userData,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ name, email, password }) => {
    try {
      if (!name || !email || !password) {
        toast.error('All fields are required.');
        return;
      }
      setError(null);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
      });
      
      toast.success('Registration successful!');
      return firebaseUser;
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please use a different email.');
        toast.error('This email is already in use.');
      } else {
        setError(err.message);
        toast.error('Registration failed. Please try again.');
      }
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    try {
      if (!email || !password) {
        toast.error('Email and password are required.');
        return;
      }
      setError(null);
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        lastLoginAt: new Date().toISOString(),
      }, { merge: true });
      
      toast.success('Logged in successfully!');
      return firebaseUser;
    } catch (err) {
      setError(err.message);
      toast.error('Login failed. Please check your credentials.');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (err) {
      console.error('Error signing out:', err);
      toast.error('Logout failed. Please try again.');
      throw err;
    }
  };

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
  };
} 