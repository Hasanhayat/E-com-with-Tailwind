import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { setUser, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const registerUser = async ({ email, password, name }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role: 'user',
    });

    return user;
  };

  const loginUser = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const logoutUser = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = { ...user, ...userDoc.data() };
            dispatch(setUser(userData));
            resolve(userData);
          } else {
            dispatch(setUser(null));
            resolve(null);
          }
          unsubscribe();
        });
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
  });

  return {
    user,
    isLoading,
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isRegistering: registerMutation.isLoading,
    isLoggingIn: loginMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
  };
}; 