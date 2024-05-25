import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqypiLcwbNwvk7LJ7RoR8XI-fOTzKquds",
  authDomain: "ethio-language-box-9f2e8.firebaseapp.com",
  databaseURL: "https://ethio-language-box-9f2e8-default-rtdb.firebaseio.com",
  projectId: "ethio-language-box-9f2e8",
  storageBucket: "ethio-language-box-9f2e8.appspot.com",
  messagingSenderId: "41373159818",
  appId: "1:41373159818:web:d83762481b0d1c984cf873",
  measurementId: "G-5XBKWQYTTE",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

export { db, app, auth };
