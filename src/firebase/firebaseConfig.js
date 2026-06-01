import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA0V9I6bDaFASNGTW7t1t6VCJ2r-o_4T30",
  authDomain: "swastii.firebaseapp.com",
  projectId: "swastii",
  storageBucket: "swastii.firebasestorage.app",
  messagingSenderId: "457098433732",
  appId: "1:457098433732:web:9979c5a4ac999c223ee591"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);