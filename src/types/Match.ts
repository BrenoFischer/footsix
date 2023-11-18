import { Round } from './Round'

export interface Match {
  homeTeam: string
  visitorTeam: string
  homeTeamScore: number
  visitorTeamScore: number
  weekOfMatch: number
  rounds: Round[]
  currentRound: number
  matchInitiated: boolean
}
