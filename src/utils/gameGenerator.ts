import { Game } from '../types/Game'
import { Team } from '../types/Team'
import { generateFirstMatchRound } from './generateFirstMatchRound'
import getTeamFromName from './getTeamFromName'
import { createTeam } from './teamGenerator'
import { createTournment } from './tournmentGenerator'

export function gameGenerator(): Game {
  const myTeam: Team = createTeam()
  const gameTeamsNames = [
    'Fluminense',
    'Botafogo',
    'Vasco',
    'Palmeiras',
    'Grêmio',
  ]

  // create all the Teams from the game
  let gameTeams = gameTeamsNames.map((team) => createTeam(team))
  gameTeams = [myTeam, ...gameTeams]

  // create all the Tournments
  const tournments = [createTournment([myTeam.name, ...gameTeamsNames])]

  // create the OnGoingMatch with the first Round
  const onGoingMatch = {
    state: 'initiated' as const,
    match: tournments[0].tournmentRounds[0].matches[0],
  }

  const homeTeamPlayers = getTeamFromName(
    gameTeams,
    onGoingMatch.match.homeTeam,
  )
  const visitorTeamPlayers = getTeamFromName(
    gameTeams,
    onGoingMatch.match.visitorTeam,
  )

  const firstRound = generateFirstMatchRound(
    homeTeamPlayers,
    visitorTeamPlayers,
  )

  onGoingMatch.match.rounds = [firstRound]

  const game: Game = {
    myTeam,
    gameTeams,
    tournments,
    currentWeek: 0,
    onGoingMatch,
  }

  console.log(game)

  return game
}
