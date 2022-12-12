// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZiBfvUk5qiaPbrh7OpR6sO9vlXIjYzBM",
  authDomain: "docs-ec049.firebaseapp.com",
  projectId: "docs-ec049",
  storageBucket: "docs-ec049.appspot.com",
  messagingSenderId: "1065203462261",
  appId: "1:1065203462261:web:6c987c530108b5488b083c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
