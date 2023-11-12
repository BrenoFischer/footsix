import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { Game } from '../types/Game'
import { createTeam } from '../utils/teamGenerator'

export const createNewGame = async (userId: string) => {
  const newGame: Game = {
    team: createTeam(),
  }

  const userDocRef = doc(db, 'users', userId)

  try {
    await setDoc(userDocRef, newGame)
  } catch (error) {
    console.log('Error while trying to create a new Game', error)
  }
}
