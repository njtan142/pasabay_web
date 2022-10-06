import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDPpwFNyCfK9TodrFDH8h_R20BN-ZGdM94",
  authDomain: "taralets-a3e29.firebaseapp.com",
  projectId: "taralets-a3e29",
  storageBucket: "taralets-a3e29.appspot.com",
  messagingSenderId: "106017804455",
  appId: "1:106017804455:web:71acfd5c81d092d769cb82",
  measurementId: "G-TP1FHNHPNV"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);