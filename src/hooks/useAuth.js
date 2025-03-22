import { useState, useEffect, createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Get additional user data from Firestore
        try {
          const userRef = doc(db, 'users', authUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
              ...userData
            });
          } else {
            // If no document exists, just use the auth user data
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to basic auth user data
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ name, email, password }) => {
    setRegisterError(null);
    setIsRegistering(true);
    
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Create user document in Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        displayName: name,
        email,
        role: 'customer',
        createdAt: new Date().toISOString()
      });
      
      // Return user
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        role: 'customer'
      };
    } catch (error) {
      setRegisterError(error);
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoginError(null);
    setIsLoggingIn(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      setLoginError(error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    isLoading,
    isLoggingIn,
    isRegistering,
    login,
    register,
    logout,
    loginError,
    registerError
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 