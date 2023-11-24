import { Round } from '../types/Round'
import { Team } from '../types/Team'
import { fieldGenerator } from './fieldGenerator'

export function generateFirstMatchRound(
  homeTeamPlayers: Team,
  visitorTeamPlayers: Team,
): Round {
  const field = fieldGenerator()

  field.rows[1].quadrants[1].playersOnQuadrant.push(homeTeamPlayers.players[1]) // Defensor 1 to Q7
  field.rows[1].quadrants[3].playersOnQuadrant.push(homeTeamPlayers.players[2]) // Defensor 2 to Q9
  field.rows[2].quadrants[1].playersOnQuadrant.push(homeTeamPlayers.players[3]) // Mid 1 to Q 12
  field.rows[2].quadrants[3].playersOnQuadrant.push(homeTeamPlayers.players[4]) // Mid 2 to Q 14
  field.rows[3].quadrants[2].playersOnQuadrant.push(homeTeamPlayers.players[5]) // Striker to Q18

  field.rows[5].quadrants[1].playersOnQuadrant.push(
    visitorTeamPlayers.players[1],
  ) // Defensor 1 to Q7
  field.rows[5].quadrants[3].playersOnQuadrant.push(
    visitorTeamPlayers.players[2],
  ) // Defensor 2 to Q9
  field.rows[4].quadrants[1].playersOnQuadrant.push(
    visitorTeamPlayers.players[3],
  ) // Mid 1 to Q 12
  field.rows[4].quadrants[3].playersOnQuadrant.push(
    visitorTeamPlayers.players[4],
  ) // Mid 2 to Q 14
  field.rows[4].quadrants[2].playersOnQuadrant.push(
    visitorTeamPlayers.players[5],
  ) // Striker to Q18

  const round: Round = {
    field,
    playerWithTheBall: homeTeamPlayers.players[1],
  }

  return round
}
