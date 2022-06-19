// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

// import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBTLOQzbf5Dpud6RXW4IM38M5oVLwnwCo',
  authDomain: 'mad-app-29c1d.firebaseapp.com',
  projectId: 'mad-app-29c1d',
  storageBucket: 'mad-app-29c1d.appspot.com',
  messagingSenderId: '326720463274',
  appId: '1:326720463274:web:ab29929c93c4bfd6bc4bd3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize realtime database
export const db = getDatabase(app);
