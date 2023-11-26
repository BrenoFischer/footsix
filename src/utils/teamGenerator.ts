import { Player } from '../types/Player'
import { Team } from '../types/Team'

export function createTeam(name = 'Flamengo', players: Player[]): Team {
  const team: Team = {
    name,
    players,
    money: 999,
  }

  return team
}
