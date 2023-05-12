import {initializeApp} from 'Firebase/app';
import {setDoc, getDoc, doc, updateDoc, getFirestore} from 'Firebase/firestore';

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const APP = initializeApp(FirebaseCredentials)
const DB_FIREBASE = getFirestore(APP);

export const addFirstUserFirebase = async (address, pseudo, lastname, email, country, dob) => {
  const data = { pseudo:pseudo, lastname:lastname, email:email, country:country, dob:dob, bookedEvents: [] }
  await setDoc(doc(DB_FIREBASE, "users", address), data)
}

export const addUserFirebase = async (address, pseudo, lastname, email, country, dob) => {
  const data = { pseudo:pseudo, lastname:lastname, email:email, country:country, dob:dob, bookedEvents: [], finishedEvents: [] }
  await updateDoc(doc(DB_FIREBASE, "users", address), data)
}

export const userSubscribeToThisEventFirebase = async (address, events) => {
  const data = {bookedEvents: events}
  await updateDoc(doc(DB_FIREBASE, "users", address), data)
}

export const userSubmitResultToThisEventFirebase = async (address, events) => {
  const data = {finishedEvents: events}
  await updateDoc(doc(DB_FIREBASE, "users", address), data)
}

export const getRegisteredUserCurrentlyConnectedFirebase = async (address) => {
  const docSnapshot = await getDoc(doc(DB_FIREBASE, "users", address));

  if (docSnapshot.exists()) {
    return {
      address: address,
      pseudo: docSnapshot.data().pseudo,
      email: docSnapshot.data().email,
      bookedEvents: docSnapshot.data().bookedEvents,
      finishedEvents: docSnapshot.data().finishedEvents,
    }
  }
}