import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDTfUjXKybsOIg2bfGjZ0rshcOoJk8hY-M",
    authDomain: "madproject-618b4.firebaseapp.com",
    projectId: "madproject-618b4",
    storageBucket: "madproject-618b4.appspot.com",
    messagingSenderId: "277621475423",
    appId: "1:277621475423:web:cd851da7e3b9232b88b3ea"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default app;