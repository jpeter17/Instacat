import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// here I want to import seed file
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyDI0dKt2Zk1xkkdmEL_HzSV_endWqpxrDE',
  authDomain: 'instacat-724e4.firebaseapp.com',
  projectId: 'instacat-724e4',
  storageBucket: 'instacat-724e4.appspot.com',
  messagingSenderId: '942514861325',
  appId: '1:942514861325:web:a606c03a3b006425c82c44'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here I want to call seed file (ONCE!)
// seedDatabase(firebase);

export { firebase, FieldValue };
