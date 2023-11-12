import { Team } from '../types/Team'
import { createPlayer } from './playerGenerator'

export function createTeam(name = 'Flamengo'): Team {
  const playersPositions = ['G', 'D', 'D', 'M', 'M', 'S']
  const players = playersPositions.map((position) => {
    return createPlayer(position)
  })

  const team: Team = {
    name,
    players,
    money: 999,
  }

  return team
}
