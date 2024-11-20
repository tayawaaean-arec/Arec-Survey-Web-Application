import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

// Your web app's Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyBZAF4TfnMirdETDqohta8TIQM2M6g4ho0",
  authDomain: "surveyapp-80561.com",
  databaseURL: "https://surveyapp-80561-default-rtdb.firebaseio.com/",
  projectId: "surveyapp-80561",
  storageBucket: "surveyapp-80561.firebasestorage.app",
  messagingSenderId: "937259663428",
  appId: "1:937259663428:android:4dd8ba065d15c45f8a3c11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };