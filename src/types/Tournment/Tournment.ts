// import { TeamPerformanceInTournment } from './TeamPerformanceInTournment'

import { Match } from '../Match'

export interface TournmentRound {
  round: number
  matches: Match[]
}

export interface Tournment {
  rounds: TournmentRound[]
  name: string
  teams: string[]
  totalNumberOfRounds: number
  currentRound: number

  // table: TeamPerformanceInTournment[]
}
