// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9MW6k4emyNY6CQuudVqrZKX_hLziAzGk",
  authDomain: "mychat-9d378.firebaseapp.com",
  databaseURL: "https://mychat-9d378-default-rtdb.firebaseio.com",
  projectId: "mychat-9d378",
  storageBucket: "mychat-9d378.appspot.com",
  messagingSenderId: "708702729525",
  appId: "1:708702729525:web:7d825046bb355749f4487c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();