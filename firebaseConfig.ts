// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCAEYVwQF0_eqM6e-mxbANjVZdifgnfJQA",
  authDomain: "d-lendq2.firebaseapp.com",
  projectId: "d-lendq2",
  storageBucket: "d-lendq2.appspot.com",
  messagingSenderId: "953264356251",
  appId: "1:953264356251:web:b8e4c6f09532f37bc63f3e"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);