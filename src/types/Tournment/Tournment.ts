// import { TeamPerformanceInTournment } from './TeamPerformanceInTournment'

import { Match } from '../Match'

export interface TournmentRound {
  matches: Match[]
}

export interface Tournment {
  tournmentRounds: TournmentRound[]
  name: string
  teams: string[]
  totalNumberOfRounds: number
  currentRound: number

  // table: TeamPerformanceInTournment[]
}
