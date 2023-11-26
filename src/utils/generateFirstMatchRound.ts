import { Field } from '../types/Field'
import { Round } from '../types/Round'
import { Team } from '../types/Team'
import { fieldGenerator } from './fieldGenerator'

export function generateFirstMatchRound(
  homeTeamPlayers: Team,
  visitorTeamPlayers: Team,
): Round {
  let field: Field = fieldGenerator()
  console.log('Field generated', field)

  field = {
    ...field,
    1: {
      ...field[1],
      1: { playersOnQuadrant: [homeTeamPlayers.players[1]] }, // defensor 1 to Q7
      3: { playersOnQuadrant: [homeTeamPlayers.players[2]] }, // Defensor 2 to Q9
    },
    2: {
      ...field[2],
      1: { playersOnQuadrant: [homeTeamPlayers.players[3]] }, // Mid 1 to Q 12
      3: { playersOnQuadrant: [homeTeamPlayers.players[4]] }, // Mid 2 to Q 14
    },
    3: {
      ...field[3],
      2: { playersOnQuadrant: [homeTeamPlayers.players[5]] }, // Striker to Q18
    },
    4: {
      ...field[4],
      1: { playersOnQuadrant: [visitorTeamPlayers.players[3]] }, // Mid 1 to Q 12
      2: { playersOnQuadrant: [visitorTeamPlayers.players[4]] }, // Mid 2 to Q 14
      3: { playersOnQuadrant: [visitorTeamPlayers.players[5]] }, // Mid 2 to Q 14
    },
    5: {
      ...field[5],
      1: { playersOnQuadrant: [visitorTeamPlayers.players[1]] }, // Mid 1 to Q 12
      3: { playersOnQuadrant: [visitorTeamPlayers.players[2]] }, // Mid 2 to Q 14
    },
  }

  homeTeamPlayers.players[1].positionOnField = { row: 1, quadrant: 1 } // defensor 1 to Q7
  homeTeamPlayers.players[2].positionOnField = { row: 1, quadrant: 3 } // Defensor 2 to Q9
  homeTeamPlayers.players[3].positionOnField = { row: 2, quadrant: 1 } // Mid 1 to Q 12
  homeTeamPlayers.players[4].positionOnField = { row: 2, quadrant: 3 } // Mid 2 to Q 14
  homeTeamPlayers.players[5].positionOnField = { row: 3, quadrant: 2 } // Striker to Q18

  visitorTeamPlayers.players[1].positionOnField = { row: 5, quadrant: 1 }
  visitorTeamPlayers.players[2].positionOnField = { row: 5, quadrant: 3 }
  visitorTeamPlayers.players[3].positionOnField = { row: 4, quadrant: 1 }
  visitorTeamPlayers.players[4].positionOnField = { row: 4, quadrant: 3 }
  visitorTeamPlayers.players[5].positionOnField = { row: 4, quadrant: 2 }
  console.log('Field after first fill', field)

  const round: Round = {
    field,
    playerWithTheBall: homeTeamPlayers.players[5],
  }

  return round
}
