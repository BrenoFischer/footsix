import { Match } from '../types/Tournment/Match'

export function matchGenerator(
  homeTeam: string,
  visitorTeam: string,
  roundOfMatch: number,
): Match {
  const newMatch: Match = {
    homeTeam,
    visitorTeam,
    homeTeamScore: 0,
    visitorTeamScore: 0,
    roundOfMatch,
  }

  return newMatch
}
