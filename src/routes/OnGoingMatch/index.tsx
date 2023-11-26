import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import getTeamFromName from '../../utils/getTeamFromName'
import { changePlayersPositionsOnNewRound } from '../../utils/OnGoingMatchUtils/changePlayersPositionsOnNewRound'
import { Field, Row } from '../../types/Field'

export default function OnGoingMatch() {
  const { activeGame } = useContext(GameContext)

  if (!activeGame) return <h1>No game selected</h1>

  const currentMatch = activeGame.data.onGoingMatch.match
  const homeTeam = getTeamFromName(
    activeGame.data.gameTeams,
    currentMatch.homeTeam,
  )
  const visitorTeam = getTeamFromName(
    activeGame.data.gameTeams,
    currentMatch.visitorTeam,
  )

  function handlePlayNextRound() {
    const currentRound = currentMatch.currentRound
    if (currentRound >= 90)
      console.log('Match finished') // TODO handle finish match
    else {
      console.log('play next round')
      changePlayersPositionsOnNewRound(currentMatch, homeTeam, visitorTeam)
    }
  }

  const field = currentMatch.rounds[currentMatch.currentRound].field

  function mapQuadrant(row: Row, quadKey: keyof Row) {
    return row[quadKey]
  }

  function mapRow(rowKey: keyof Field) {
    console.log(field[rowKey])
    return field[rowKey]
  }

  const rows = [0, 1, 2, 3, 4, 5, 6]
  const quads = [0, 1, 2, 3]

  return (
    <>
      <h1>On Going Match</h1>
      <span></span>
      <span>{homeTeam.name}</span> - <span>{visitorTeam?.name}</span>
      <span>{currentMatch.homeTeamScore}</span>X
      <span>{currentMatch.visitorTeamScore}</span>
      <div style={{ display: 'flex' }}>
        <ul>
          {homeTeam.players?.map((player, idx) => {
            return <li key={player.name + idx}>{player.name}</li>
          })}
        </ul>
        <ul>
          {visitorTeam.players?.map((player, idx) => {
            return <li key={player.name + idx}>{player.name}</li>
          })}
        </ul>
      </div>
      <p>
        Player with the ball: {currentMatch.rounds[0].playerWithTheBall.name}
      </p>
      <p>Current Round: {currentMatch.currentRound}</p>
      <p>total rounds: {currentMatch.rounds.length}</p>
      <h2>Current field:</h2>
      <ul>
        {rows.map((rowKey) => {
          const row = mapRow(rowKey as keyof Field)
          return quads.map((quadKey) => {
            const quad = mapQuadrant(row, quadKey as keyof Row)
            if (quad.playersOnQuadrant.length === 0)
              return (
                <li key={quadKey + rowKey}>
                  Row {rowKey} - Quad {quadKey}:
                </li>
              )
            return quad.playersOnQuadrant.map((player) => (
              <li key={player.id}>
                Row {rowKey} - Quad {quadKey}: {player.name + player.team}
              </li>
            ))
          })
        })}
      </ul>
      <button onClick={handlePlayNextRound}>Play next round</button>
    </>
  )
}
