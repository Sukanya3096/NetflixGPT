// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4DTfguQCKfwZLn3oHB8YP9CfAEpjH2pw",
  authDomain: "netflix-gpt-8778a.firebaseapp.com",
  projectId: "netflix-gpt-8778a",
  storageBucket: "netflix-gpt-8778a.appspot.com",
  messagingSenderId: "609312106230",
  appId: "1:609312106230:web:e4123fdc2cd93fe8aa2ed7",
  measurementId: "G-XDVZ7X22TZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
