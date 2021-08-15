import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAI4S3kCEntMRgdKR0B035LKxxIYn0VgCs",
    authDomain: "whatsapp-2-6d520.firebaseapp.com",
    projectId: "whatsapp-2-6d520",
    storageBucket: "whatsapp-2-6d520.appspot.com",
    messagingSenderId: "546096095747",
    appId: "1:546096095747:web:c8cb7b5d3ac42456b9e436"
  };

const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};

