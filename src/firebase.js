// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbDWcD2F7NkKkhP595GfVPFmGegEkpfdQ",
  authDomain: "starlight-data.firebaseapp.com",
  projectId: "starlight-data",
  storageBucket: "starlight-data.appspot.com",
  messagingSenderId: "220237514568",
  appId: "1:220237514568:web:d36608fb03aed02557557d",
  measurementId: "G-WLN6E581SJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);