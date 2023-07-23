// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getDatabase} from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuwMew49bhmixaWGx9AX8bXljhwcSKK2s",
  authDomain: "todoapp-6d66f.firebaseapp.com",
  databaseURL: "https://todoapp-6d66f-default-rtdb.firebaseio.com",
  projectId: "todoapp-6d66f",
  storageBucket: "todoapp-6d66f.appspot.com",
  messagingSenderId: "470419474056",
  appId: "1:470419474056:web:6cea3900684e2a3e49413d",
  measurementId: "G-JJY7K80KD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth();
