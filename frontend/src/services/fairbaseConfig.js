import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyClCDlfDqFESl15jFCqSnhhjFAo9sAae5Q",
    authDomain: "soundspacemusicproject.firebaseapp.com",
    projectId: "soundspacemusicproject",
    storageBucket: "soundspacemusicproject.appspot.com",
    messagingSenderId: "541239799644",
    appId: "1:541239799644:web:6acc1cefdaf9e4f6ce9b99",
    measurementId: "G-0J4MCWTJTW",
};

const app = initializeApp(firebaseConfig);

export { app };
