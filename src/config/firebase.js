import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyDhM_CxnJkKpTZCFxIdva2GhKdQ2XkRhc0",
  authDomain: "paco1821-8c089.firebaseapp.com",
  databaseURL: "https://paco1821-8c089-default-rtdb.firebaseio.com",
  projectId: "paco1821-8c089",
  storageBucket: "paco1821-8c089.appspot.com",
  messagingSenderId: "275806481204",
  appId: "1:275806481204:web:00332f86143a49c7231361",
  measurementId: "G-TGJ7W3ZZ8P"
})

export const auth = app.auth()
export const db = app.firestore()
export default app