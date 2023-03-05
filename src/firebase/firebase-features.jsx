import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase-config'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, doc, getFirestore } from 'firebase/firestore'
initializeApp(firebaseConfig)

export const auth = getAuth()
export const authProvider = new GoogleAuthProvider()
export const database = getFirestore()
