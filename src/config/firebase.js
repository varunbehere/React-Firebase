import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"; // sets up authentication
import {getFirestore} from "firebase/firestore"; // sets up database

const firebaseConfig = {
  apiKey: "AIzaSyCLd_VF8yKYUUEy8AOVrt9J8ILTjnJTpN4",
  authDomain: "react-firebase-15bce.firebaseapp.com",
  projectId: "react-firebase-15bce",
  storageBucket: "react-firebase-15bce.firebasestorage.app",
  messagingSenderId: "579910196883",
   measurementId: "G-MJY1VHBRQ3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);