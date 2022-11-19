import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAbQ85Nq3zr5LlL7kEORTFNR9bgKoeHmeQ",
  authDomain: "various-ideas.firebaseapp.com",
  projectId: "various-ideas",
  storageBucket: "various-ideas.appspot.com",
  messagingSenderId: "1072231740689",
  appId: "1:1072231740689:web:3c9f4037409ab795e648b0",
  measurementId: "G-XE5ZM202Q4"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export {
  db, storage
}

