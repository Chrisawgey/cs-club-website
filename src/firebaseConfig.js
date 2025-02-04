import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtUFRFozm_qnEsPM0dXmeZ-La6WavLsuU",
  authDomain: "cschatroom-61048.firebaseapp.com",
  projectId: "cschatroom-61048",
  storageBucket: "cschatroom-61048.appspot.com",
  messagingSenderId: "244983335090",
  appId: "1:244983335090:web:d1e5a0eaa55849a82f61ab",
  measurementId: "G-6R8049MQK8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
