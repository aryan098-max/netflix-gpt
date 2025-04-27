// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMEjixqiVLm8jpNOjS0-AQWgpvFUDTZ9U",
  authDomain: "netflixgpt-cf65b.firebaseapp.com",
  projectId: "netflixgpt-cf65b",
  storageBucket: "netflixgpt-cf65b.firebasestorage.app",
  messagingSenderId: "908525230725",
  appId: "1:908525230725:web:9bfc5890d89effbbb927ec",
  measurementId: "G-CQWV5XGHFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();