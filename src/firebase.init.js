// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCczfS7pS53VlBL_DhGKqcKl6UzdHhHrmw",
  // authDomain: "genius-car-service-d547b.firebaseapp.com",
  // projectId: "genius-car-service-d547b",
  // storageBucket: "genius-car-service-d547b.appspot.com",
  // messagingSenderId: "776393839432",
  // appId: "1:776393839432:web:23e70ef4fff47ae82c997d"
  apiKey:process.env.REACT_APP_apiKey,
  authDomain:process.env.REACT_APP_authDomain,
  projectId:process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId:process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
