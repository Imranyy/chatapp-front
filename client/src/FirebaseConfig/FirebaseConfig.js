
import { initializeApp } from "firebase/app";
import{getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCUS5XAxDhJZ43wdGlw8Gb_24dIqqfE70",
    authDomain: "chat-with-mee.firebaseapp.com",
    projectId: "chat-with-mee",
    storageBucket: "chat-with-mee.appspot.com",
    messagingSenderId: "863911802942",
    appId: "1:863911802942:web:6b3a51d15adca6a712f96f",
    measurementId: "G-0N5TTSGK4H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage=getStorage(app);


export{ projectStorage,ref,getDownloadURL,uploadBytesResumable};