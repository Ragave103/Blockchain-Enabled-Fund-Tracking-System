import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //enter your firebaseconfig here
  apiKey: "Enter your api key here",
  authDomain: "blockapp-a2639.firebaseapp.com",
  projectId: "blockapp-a2639",
  storageBucket: "blockapp-a2639.appspot.com",
  messagingSenderId: "323467147236",
  appId: "Enter the app Id here",
  measurementId: "G-H95EFTYMME",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
