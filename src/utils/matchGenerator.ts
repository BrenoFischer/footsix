import { Match } from '../types/Match'

export function matchGenerator(
  homeTeam: string,
  visitorTeam: string,
  weekOfMatch: number,
): Match {
  const newMatch: Match = {
    homeTeam,
    visitorTeam,
    homeTeamScore: 0,
    visitorTeamScore: 0,
    rounds: [],
    matchInitiated: false,
    weekOfMatch,
  }

  return newMatch
}
