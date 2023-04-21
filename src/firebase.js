// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxU1Q1itOuRPsn-FG1cBK0ZeovBmvfbYY",
    authDomain: "warehouse2650-e8e4c.firebaseapp.com",
    projectId: "warehouse2650-e8e4c",
    storageBucket: "warehouse2650-e8e4c.appspot.com",
    messagingSenderId: "276754719548",
    appId: "1:276754719548:web:b7d25994f2394600567439"
};

// Initialize Firebase
const app= initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
