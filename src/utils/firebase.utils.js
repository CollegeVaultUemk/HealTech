// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2IUWKTkxvh1OyYA5DMGLHOSAEatdfhco",
  authDomain: "medical-site-78f08.firebaseapp.com",
  projectId: "medical-site-78f08",
  storageBucket: "medical-site-78f08.appspot.com",
  messagingSenderId: "906116509083",
  appId: "1:906116509083:web:1941ac9a7501a96c69c53e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();

provider.setCustomParameters({ prompt: "select_account" });

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalData = {}
) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const Snapshot = await getDoc(userRef);

  if (!Snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
};

export const SignInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const userSignUpWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const userSignInWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => {
  return await signOut(auth);
};

export const AuthChangeListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
