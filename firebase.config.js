// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMbdkj2ssy9FalAJMO133fHPgMNkf0cT8",
  authDomain: "assaignment-10-1c679.firebaseapp.com",
  projectId: "assaignment-10-1c679",
  storageBucket: "assaignment-10-1c679.appspot.com",
  messagingSenderId: "171013666862",
  appId: "1:171013666862:web:6e783d9530ca3d043507bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

export default app;