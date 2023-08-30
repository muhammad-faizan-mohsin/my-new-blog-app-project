import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged,signOut    } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore,doc, setDoc, getDoc ,updateDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpbZQzmLHpJlJLMUzZhQyT73HkUzlVT8w",
    authDomain: "auth-dcc8f.firebaseapp.com",
    projectId: "auth-dcc8f",
    storageBucket: "auth-dcc8f.appspot.com",
    messagingSenderId: "900412664215",
    appId: "1:900412664215:web:ebc566737718a5d1c37cd2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
    auth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged ,signOut ,db,doc, setDoc, getDoc, updateDoc 
}