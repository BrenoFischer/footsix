import { Game } from '../types/Game'
import { Team } from '../types/Team'
import { generateFirstMatchRound } from './generateFirstMatchRound'
import getTeamFromName from './getTeamFromName'
import { createPlayer } from './playerGenerator'
import { createTeam } from './teamGenerator'
import { createTournment } from './tournmentGenerator'

export function gameGenerator(): Game {
  const gameTeamsNames = [
    'Fluminense',
    'Botafogo',
    'Vasco',
    'Palmeiras',
    'Grêmio',
  ]

  // Create all the Teams from the game, besides User Team
  // create 6 Players for each Team - this will be distributed between Teams
  const playersPositions = ['G', 'D', 'D', 'M', 'M', 'S']
  let gameTeams = gameTeamsNames.map((team) => {
    const players = playersPositions.map((position) => {
      return createPlayer(position, team)
    })
    return createTeam(team, players)
  })

  // Create User Team
  const myTeamName = 'Flamengo'
  const myPlayers = playersPositions.map((position) => {
    return createPlayer(position, myTeamName)
  })
  const myTeam: Team = createTeam(myTeamName, myPlayers)

  // Unite all the Teams from the game
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
