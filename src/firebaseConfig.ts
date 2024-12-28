// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhQXjs_yvqei1-Qc2E7TRUiSfkY_O6Tgg",
    authDomain: "pokedex-lites.firebaseapp.com",
    projectId: "pokedex-lites",
    storageBucket: "pokedex-lites.firebasestorage.app",
    messagingSenderId: "23621661551",
    appId: "1:23621661551:web:c908a929913a9e7fc56e9a",
    measurementId: "G-7NDH0FXFNK"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };