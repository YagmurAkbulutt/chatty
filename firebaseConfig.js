import { initializeApp, firebase } from "firebase/app";
import {getAuth} from "firebase/auth"
import "firebase/firestore"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAYayY3LC6LeO6vYASb9z02l4kqVqUMnPY",
  authDomain: "chatty-e60b1.firebaseapp.com",
  projectId: "chatty-e60b1",
  storageBucket: "chatty-e60b1.firebasestorage.app",
  messagingSenderId: "725668493165",
  appId: "1:725668493165:web:4296276fc8cc7333760c64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)