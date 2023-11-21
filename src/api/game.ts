import {
  doc,
  addDoc,
  collection,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from './firebase'
import { Game, GameRef } from '../types/Game'
import { gameGenerator } from '../utils/gameGenerator'

const firestoreConverter = {
  toFirestore: (data: Game) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Game,
}

export const createNewGame = async (userId: string) => {
  const newGame = gameGenerator()

  const userDocRef = doc(db, 'users', userId)

  try {
    await addDoc(collection(userDocRef, 'games'), newGame)
  } catch (error) {
    console.log('Error while trying to create a new Game', error)
  }
}

export const listExistingGames = async (userId: string) => {
  const games: GameRef[] = []

  try {
    const userDocRef = doc(db, 'users', userId)
    const gamesSnapshot = await getDocs(
      collection(userDocRef, 'games').withConverter(firestoreConverter),
    )

    gamesSnapshot.forEach((game) => {
      games.push({ id: game.id, data: game.data() })
    })
  } catch (error) {
    console.log('Error while getting games from an User', error)
  }

  return games
}
