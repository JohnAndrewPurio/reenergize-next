import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQj-iaDbZUTtII_aRb6hRvQ0VkZ_FU-5g",
  authDomain: "re-energize.firebaseapp.com",
  projectId: "re-energize",
  storageBucket: "re-energize.appspot.com",
  messagingSenderId: "372872743297",
  appId: "1:372872743297:web:7828d5c352b522b1c70080",
  measurementId: "G-JK9F9528DR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);