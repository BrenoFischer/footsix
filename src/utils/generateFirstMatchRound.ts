import { Game } from '../types/Game'
import { Match } from '../types/Match'
import { Round } from '../types/Round'
import { fieldGenerator } from './fieldGenerator'
import getTeamFromName from './getTeamFromName'

export function generateFirstMatchRound(match: Match, activeGame: Game): Round {
  const field = fieldGenerator()

  const homeTeamPlayers = getTeamFromName(activeGame, match.homeTeam)
  const visitorTeamPlayers = getTeamFromName(activeGame, match.visitorTeam)

  console.log(field)

  field.quadrants[6].playersOnQuadrant.push(homeTeamPlayers.players[1]) // Defensor 1 to Q7
  field.quadrants[8].playersOnQuadrant.push(homeTeamPlayers.players[2]) // Defensor 2 to Q9
  field.quadrants[11].playersOnQuadrant.push(homeTeamPlayers.players[3]) // Mid 1 to Q 12
  field.quadrants[14].playersOnQuadrant.push(homeTeamPlayers.players[4]) // Mid 2 to Q 14
  field.quadrants[18].playersOnQuadrant.push(homeTeamPlayers.players[5]) // Striker to Q18

  field.quadrants[31].playersOnQuadrant.push(visitorTeamPlayers.players[1]) // Defensor 1 to Q7
  field.quadrants[33].playersOnQuadrant.push(visitorTeamPlayers.players[2]) // Defensor 2 to Q9
  field.quadrants[21].playersOnQuadrant.push(visitorTeamPlayers.players[3]) // Mid 1 to Q 12
  field.quadrants[23].playersOnQuadrant.push(visitorTeamPlayers.players[4]) // Mid 2 to Q 14
  field.quadrants[22].playersOnQuadrant.push(visitorTeamPlayers.players[5]) // Striker to Q18

  const round: Round = {
    field,
    playerWithTheBall: homeTeamPlayers.players[1],
  }

  return round
}
