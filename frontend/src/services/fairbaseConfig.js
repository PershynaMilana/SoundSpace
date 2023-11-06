import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBCUDpKA_HIg7USUbabNB63hC_HwQbbHjM",
    authDomain: "l07-artem-06-07.firebaseapp.com",
    databaseURL: "https://l07-artem-06-07-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "l07-artem-06-07",
    storageBucket: "l07-artem-06-07.appspot.com",
    messagingSenderId: "495058124111",
    appId: "1:495058124111:web:2e92f21799b3bc56e4193a",
    measurementId: "G-CGS5KFZZ8N"
  };

  const app = initializeApp(firebaseConfig);

  export { app };
