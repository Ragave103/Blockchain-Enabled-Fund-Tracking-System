import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3Hdf0uR12-KFV77jAgB1B-ZAcb0Wl5dw",
  authDomain: "blockapp-a2639.firebaseapp.com",
  projectId: "blockapp-a2639",
  storageBucket: "blockapp-a2639.appspot.com",
  messagingSenderId: "323467147236",
  appId: "1:323467147236:web:6923da26520dc81f2f39f1",
  measurementId: "G-H95EFTYMME",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
