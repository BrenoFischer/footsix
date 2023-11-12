import { Match } from './Match'
import { TeamPerformanceInTournment } from './TeamPerformanceInTournment'

export interface Tournment {
  name: string
  table: TeamPerformanceInTournment[]
  currentRound: number
  totalNumberOfRounds: number
  matches: Match[]
}
