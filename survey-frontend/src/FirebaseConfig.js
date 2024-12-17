import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyB9PNaz-GIS9EGLzPu1hUs9kFFk22h5RL0",
  authDomain: "cares-2e2bf.com",
  databaseURL: "https://cares-2e2bf-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "cares-2e2bf",
  storageBucket: "cares-2e2bf.firebasestorage.app",
  messagingSenderId: "470014868313",
  appId: "1:470014868313:android:cf911f76914472d8b52a48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db,onChildAdded,ref, get };