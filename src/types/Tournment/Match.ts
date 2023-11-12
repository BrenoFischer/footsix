import { Team } from '../Team'

export interface Match {
  homeTeam: Team
  visitorTeam: Team
  homeTeamScore: number
  visitorTeamScore: number
  roundOfMatch: number
}
