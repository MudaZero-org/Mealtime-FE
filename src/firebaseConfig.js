// FIREBASE TEMPLATE
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCksz6Jo4KcZaCaRiEgEoaVHDK1NGd85XY",
//   authDomain: "mealtime-9c627.firebaseapp.com",
//   projectId: "mealtime-9c627",
//   storageBucket: "mealtime-9c627.appspot.com",
//   messagingSenderId: "18780447925",
//   appId: "1:18780447925:web:582ea63f3960d746bb8afc",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

//###########################################################################

// WEBSITE TEMPLATE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyCksz6Jo4KcZaCaRiEgEoaVHDK1NGd85XY",
  authDomain: "mealtime-9c627.firebaseapp.com",
  projectId: "mealtime-9c627",
  storageBucket: "mealtime-9c627.appspot.com",
  messagingSenderId: "18780447925",
  appId: "1:18780447925:web:582ea63f3960d746bb8afc",
});
// ^^^ missing measurementId ???

// Initialize Firebase
const storage = getStorage(app);
export default storage;
