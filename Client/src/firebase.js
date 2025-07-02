// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey : import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8813c.firebaseapp.com",
  projectId: "mern-blog-8813c",
  storageBucket: "mern-blog-8813c.firebasestorage.app",
  messagingSenderId: "1028700452131",
  appId: "1:1028700452131:web:818266d56bf54868a7c896",
  measurementId: "G-K9RG6KFZV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;