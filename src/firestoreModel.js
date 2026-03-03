// initialize Firebase app
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

// uncomment the following lines when you have your firebaseConfig. Understand what the lines are doing!
//import {firebaseConfig} from "/src/firebaseConfig.js";
//const app= initializeApp(firebaseConfig);
//const db= getFirestore(app);
//window.db= db

// make doc and setDoc available at the Console for testing
window.doc= doc        
window.setDoc= setDoc


/* Replace NN with your TW2_TW3 group number! */
const COLLECTION="dinnerModelNN";

// TODO: read the code above
// TODO: export the function connectToPersistence, it can be empty for starters