import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
// import {FirebaseStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBDGMlJ4y5oBiDNeYbCzQ2u950jMSDV9l8",
  authDomain: "my-todo-84219.firebaseapp.com",
  projectId: "my-todo-84219",
  storageBucket: "my-todo-84219.appspot.com",
  messagingSenderId: "1014751652742",
  appId: "1:1014751652742:web:d49afd94cfda74b60e1a07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
