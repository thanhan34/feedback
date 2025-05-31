import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASNkd2FdKFc104CWgz52imU5Hd9CajB8U",
  authDomain: "feedback-ff3ee.firebaseapp.com",
  projectId: "feedback-ff3ee",
  storageBucket: "feedback-ff3ee.firebasestorage.app",
  messagingSenderId: "692631838085",
  appId: "1:692631838085:web:a6b18cfdb0813c66b538ec",
  measurementId: "G-V2BNZ6WGLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Analytics is only available on the client side
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { db };
