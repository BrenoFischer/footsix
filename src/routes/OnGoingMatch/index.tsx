import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import getTeamFromName from '../../utils/getTeamFromName'
import { Match } from '../../types/Match'

export default function OnGoingMatch() {
  const { activeGame, initiateOnGoingMatch, getOnGoingMatch } =
    useContext(GameContext)

  const currentRound = activeGame?.data.currentWeek

  let currentMatch: Match | null = getOnGoingMatch()

  if (!currentMatch) {
    if (activeGame?.data.onGoingMatch.state === 'not initiated') {
      // the player Match will always be the first on the tournment round matches array (matches[0])
      currentMatch =
        activeGame!.data.tournments[0].rounds[currentRound!].matches[0]
      initiateOnGoingMatch(currentMatch)
    }
  }

  const homeTeam = getTeamFromName(activeGame!.data, currentMatch!.homeTeam)
  const visitorTeam = getTeamFromName(
    activeGame!.data,
    currentMatch!.visitorTeam,
  )

  function handlePlayNextRound() {
    console.log('play next round')
  }

  return (
    <>
      <h1>On Going Match</h1>
      <span></span>
      <span>{homeTeam?.name}</span> - <span>{visitorTeam?.name}</span>
      <span>{currentMatch!.homeTeamScore}</span>X
      <span>{currentMatch!.visitorTeamScore}</span>
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
        Player with the ball: {currentMatch!.rounds[0].playerWithTheBall.name}
      </p>
      <p>Current Round: {currentMatch!.currentRound}</p>
      <p>total rounds: {currentMatch!.rounds.length}</p>
      <h2>Current field:</h2>
      <ul>
        {currentMatch!.rounds[currentMatch!.currentRound].field.quadrants.map(
          (quadrant, idx) => {
            const quadrantPlayers = quadrant.playersOnQuadrant.map(
              (player) => player.name + '-' + player.team,
            )

            return (
              <li key={idx}>
                Quadrant:{idx} - {quadrantPlayers}{' '}
              </li>
            )
          },
        )}
      </ul>
      <button onClick={handlePlayNextRound}>Play next round</button>
    </>
  )
}
