import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDfcgK5pqRXtJ8nhF4WXC0FXGG_pFbxli4",
    authDomain: "sport-app-17c7f.firebaseapp.com",
    projectId: "sport-app-17c7f",
    storageBucket: "sport-app-17c7f.appspot.com",
    messagingSenderId: "596076866122",
    appId: "1:596076866122:web:442e0db054dd7a54f714b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
