import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  NextOrObserver,
  UserCredential,
  User,
} from 'firebase/auth'
import { db, firebaseApp } from './firebase'
import { doc, getDoc, setDoc, QueryDocumentSnapshot } from 'firebase/firestore'

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

interface AdditionalInformation {
  displayName?: string
}

export interface UserData {
  displayName: string
  email: string
}

// Create a new User doc on Firestore (if it does not exists)
export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation,
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('Error while creating the User on DB', error)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>
}

// Create a new User on the Auth
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential | void> => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}
