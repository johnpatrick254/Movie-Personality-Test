// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbYmlH152PmiYElG5DciOP9dT8k71NzRA",
    authDomain: "reel-radar.firebaseapp.com",
    projectId: "reel-radar",
    storageBucket: "reel-radar.appspot.com",
    messagingSenderId: "738845641908",
    appId: "1:738845641908:web:533071901b8bca076d5be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)