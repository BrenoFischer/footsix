// import { Field } from '../../types/Field'
import { Match } from '../../types/Match'
import { Player } from '../../types/Player'
import { PositionOnField } from '../../types/PositionOnField'
import { Team } from '../../types/Team'
import getTeamFromName from '../getTeamFromName'

// function updatePlayerPositionOnField(
//   oldPlayerPos: PositionOnField,
//   newPlayerPos: PositionOnField,
//   player: Player,
//   field: Field,
// ): Field {
//   const oldRow = field.rows[oldPlayerPos.row]
//   const newRow = field.rows[newPlayerPos.quadrant]
//   const oldQuad = oldRow.quadrants[oldPlayerPos.quadrant]
//   const newQuad = newRow.quadrants[newPlayerPos.quadrant]

//   // Get Players on the old PositionOnField and filter to exclude Player
//   const oldQuadrantWithoutPlayer = oldQuad.playersOnQuadrant.filter(
//     (playerOnSameQuadrant) => playerOnSameQuadrant.id !== player.id,
//   )
//   const oldRowWithoutPlayer = [...oldRow.quadrants, oldQuadrantWithoutPlayer]
//   // Expand Players on new PositionOnField and adds Player to it
//   const newQuadrantWithPlayer = [...newQuad.playersOnQuadrant, player]
//   return {
//     rows: [...field.rows, ]
//   }
// }

// function updatePlayerPosition(player: Player, newPos: PositionOnField): Player {
//   return {
//     ...player,
//     positionOnField: newPos,
//   }
// }

function checkPositionOnFieldAroundPlayer(
  pos: PositionOnField,
  rowsToCheck: number[],
  ballPos: PositionOnField,
  checkBallPos: boolean = false,
): PositionOnField {
  // receives the Player PositionOnField and an Array to Rows to check around
  // it will check with preference of the crescent order of items of the Rows to check Array

  for (let i = 0; i < rowsToCheck.length; i++) {
    const row = rowsToCheck[i]
    if (!(row > 6) || !(row < 0)) {
      // row is inside Field dimensions
      if (checkBallPos) {
        // this is to check if Player is going to chase the Player with the ball and go to his direction
        if (row === ballPos.row) {
          // if this is the Row the Player with the ball is, this Player will move into ball direction
          if (pos.quadrant === ballPos.quadrant)
            return { row, quadrant: pos.quadrant }
          if (pos.quadrant > ballPos.quadrant)
            return { row, quadrant: pos.quadrant - 1 }
          if (pos.quadrant < ballPos.quadrant)
            return { row, quadrant: pos.quadrant + 1 }
        }
      }
      return { row, quadrant: pos.quadrant }
    }
  }
  return pos
}

function playerIsInFrontOfTheBall(
  player: Player,
  ballPos: PositionOnField,
  homeTeam: string,
) {
  // Return true if Player PositionOnField Row is relatively higher than PositionOnField Row of the ball
  // note that this is relative to the homeTeam -> if Player if from home team, Rows are crescent
  // if Player is not from homeTeam, Rows are decrescent
  // note that if PositionOnField of both are in the same Row, this will still return false
  if (player.team === homeTeam) return player.positionOnField.row > ballPos.row
  return player.positionOnField.row < ballPos.row
}

function getPlayerNewPos(
  player: Player,
  playerFromTeamWithTheBall: boolean,
  ballPos: PositionOnField,
  homeTeam: string,
) {
  const pos = player.positionOnField
  const playerRow = pos.row
  const playerFunction = player.position
  const playerIsFromHomeTeam = player.team === homeTeam
  // This value is added to Rows, accordingly to the attack direction of the Team
  const incrementRow = playerIsFromHomeTeam ? 1 : -1
  // Value reference of Row limit a Defensor will forward on the field, accordingly to attack direction
  const rowReferenceForDefensors = playerIsFromHomeTeam ? 4 : 3
  if (playerFunction === 'G') return pos

  // Players from Visitor Team will attack in a decrescent order of Rows
  if (playerFromTeamWithTheBall) {
    console.log('Player from Team with the ball')
    // Players from Team with the ball will try to forward on the Field
    if (playerIsInFrontOfTheBall(player, ballPos, homeTeam)) {
      // Players will decide to move first, accordingly with the PositionOnField of the ball
      // Players will decide to move after, accordingly to its Function (position)
      if (playerFunction === 'D') {
        // Defensors will try to be always behind the ball PositionOnField
        return checkPositionOnFieldAroundPlayer(
          pos,
          [playerRow - incrementRow],
          ballPos,
        )
      }
      if (playerFunction === 'M') {
        // Mid Players will always try to be in the same Row of the ball
        return checkPositionOnFieldAroundPlayer(
          pos,
          [playerRow - incrementRow],
          ballPos,
        )
      }
      if (playerFunction === 'S') {
        // Strikers will always try to be in front of the ball Row
        return checkPositionOnFieldAroundPlayer(
          pos,
          [playerRow + incrementRow],
          ballPos,
        )
      }
    } else {
      // Player is not in Front of the Ball
      if (pos.row === ballPos.row) {
        console.log('Player in the row of the ball')
        // Player is in the same row of the ball
        if (playerFunction === 'D') {
          return checkPositionOnFieldAroundPlayer(
            pos,
            [playerRow - incrementRow],
            ballPos,
          )
        }
        if (playerFunction === 'M') {
          return checkPositionOnFieldAroundPlayer(pos, [playerRow], ballPos)
        }
        if (playerFunction === 'S') {
          return checkPositionOnFieldAroundPlayer(
            pos,
            [playerRow + incrementRow],
            ballPos,
          )
        }
      } else {
        console.log('Player behind the ball')
        // Player is behind the ball
        if (playerFunction === 'D') {
          console.log('D')
          // Defensors will be behind the ball and no greater than Row 4 (homeTeam) and Row 3 (visitorTeam) -> rowReferenceForDefensors
          const rowToGo =
            playerRow > rowReferenceForDefensors
              ? -1
              : playerRow === rowReferenceForDefensors
              ? 0
              : 1
          return checkPositionOnFieldAroundPlayer(
            pos,
            [playerRow + rowToGo * incrementRow],
            ballPos,
          )
        }
        if (playerFunction === 'M') {
          return checkPositionOnFieldAroundPlayer(
            pos,
            [playerRow + incrementRow],
            ballPos,
          )
        }
        if (playerFunction === 'S') {
          return checkPositionOnFieldAroundPlayer(
            pos,
            [playerRow + incrementRow],
            ballPos,
          )
        }
      }
    }
  } else {
    // Player is not from the Team with the ball
    // Players without the ball will always to get the ball or position strategically to be near
  }
}

export function changePlayersPositionsOnNewRound(
  currentMatch: Match,
  homeTeam: Team,
  visitorTeam: Team,
) {
  // first it'll update Players from Team that has the ball
  // after, it'll update Players from Team that does not have the ball
  const currentRound = currentMatch.rounds[currentMatch.currentRound]
  const playerWithTheBall = currentRound.playerWithTheBall
  const playerWithTheBallTeam = getTeamFromName(
    [homeTeam, visitorTeam],
    playerWithTheBall.team,
  )
  // const teamWithoutTheBall = [homeTeam, visitorTeam].filter(
  //   (team) => team.name !== playerWithTheBall.team,
  // )[0]

  playerWithTheBallTeam.players.forEach((player) => {
    console.log(player)
    const newPos = getPlayerNewPos(
      player,
      true,
      playerWithTheBall.positionOnField,
      homeTeam.name,
    )
    console.log(newPos)
  })
}
