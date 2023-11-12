import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCEoaFiU-SgtLdepn0YUJd9O-QtZnSgfZc',
  authDomain: 'footsix-eb6d6.firebaseapp.com',
  projectId: 'footsix-eb6d6',
  storageBucket: 'footsix-eb6d6.appspot.com',
  messagingSenderId: '489249537762',
  appId: '1:489249537762:web:1324042838296d4cd728bb',
  measurementId: 'G-3508MHT123',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Initialize DB
export const db = getFirestore()
