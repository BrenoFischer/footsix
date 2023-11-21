import { Game } from '../types/Game'
import { Team } from '../types/Team'
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
  const gameTeams = gameTeamsNames.map((team) => createTeam(team))

  const game: Game = {
    myTeam,
    gameTeams,
    tournments: [createTournment([myTeam.name, ...gameTeamsNames])],
    currentWeek: 0,
    onGoingMatch: {
      activeMatch: null,
      state: 'not initiated',
    },
  }

  return game
}
