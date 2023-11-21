import { OnGoingMatch } from './OnGoingMatch'
import { Team } from './Team'
import { Tournment } from './Tournment/Tournment'

export interface Game {
  tournments: Tournment[]
  myTeam: Team
  gameTeams: Team[]
  currentWeek: number
  onGoingMatch: OnGoingMatch
}

export interface GameRef {
  id: string
  data: Game
}
