// firebaseConfig.js
// Import the functions you need from the SDKs you need
// firebaseconfig.js
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdh-frhUEcl1NelzMlCsCdFbEnaUDHJFk",
  authDomain: "ai-predidct-soccer.firebaseapp.com",
  databaseURL: "https://ai-predidct-soccer-default-rtdb.firebaseio.com",
  projectId: "ai-predidct-soccer",
  storageBucket: "ai-predidct-soccer.appspot.com",
  messagingSenderId: "974992796902",
  appId: "1:974992796902:web:1261dbea472f75f703df27",
  measurementId: "G-9FPBK9SJ12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
