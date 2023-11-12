import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  NextOrObserver,
  User,
} from 'firebase/auth'
import { firebaseApp } from './firebase'

// Create the object to handle Authentication
const auth = getAuth(firebaseApp)

// Authenticate with email and password given
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

// Listener that handle when authentication is changed. It needs a callback function that will receive the User state whenever auth is changed
export const onAuthStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback)

// Sign out the current user
export const signOutUser = async () => await signOut(auth)

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}
