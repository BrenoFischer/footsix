import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import getTeamFromName from '../../utils/getTeamFromName'

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
    console.log('play next round')
  }

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
        {currentMatch.rounds[currentMatch.currentRound].field.rows.map(
          (row, rowId) => {
            return row.quadrants.map((quadrant, quadId) => {
              const quadrantPlayers = quadrant.playersOnQuadrant.map(
                (player) => player.name + '-' + player.team,
              )
              return (
                <li key={rowId + quadId}>
                  Row[{rowId}] - Quadrant:{quadId} - {quadrantPlayers}{' '}
                </li>
              )
            })
          },
        )}
      </ul>
      <button onClick={handlePlayNextRound}>Play next round</button>
    </>
  )
}
