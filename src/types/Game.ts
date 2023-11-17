import { DocumentData } from 'firebase/firestore'
import { Team } from './Team'

export interface Game {
  team: Team
}

export interface GameRef {
  id: string
  data: DocumentData
}
