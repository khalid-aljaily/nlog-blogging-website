// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefHDKYB1_X6eC88xqVZRRH_O-mJyROnY",
  authDomain: "blogging-website-79c35.firebaseapp.com",
  projectId: "blogging-website-79c35",
  storageBucket: "blogging-website-79c35.appspot.com",
  messagingSenderId: "189007098303",
  appId: "1:189007098303:web:a780c0e8de83752be7f10a",
  measurementId: "G-JZ0C00B9FW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

