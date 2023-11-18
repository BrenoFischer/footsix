import { Team } from './Team'
import { Tournment } from './Tournment/Tournment'

export interface Game {
  tournments: Tournment[]
  myTeam: Team
  gameTeams: Team[]
  currentWeek: number
}

export interface GameRef {
  id: string
  data: Game
}
