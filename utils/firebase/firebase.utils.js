
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDFgdGr6IIk2dWR_fuYWt3oUkHdPTW3FWw",
  authDomain: "nextjs-chat-f99e6.firebaseapp.com",
  projectId: "nextjs-chat-f99e6",
  storageBucket: "nextjs-chat-f99e6.appspot.com",
  messagingSenderId: "1062583413870",
  appId: "1:1062583413870:web:419a9fcf6e408bd723ca7f"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const db = getFirestore();
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); 
