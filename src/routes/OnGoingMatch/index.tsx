import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import getTeamFromName from '../../utils/getTeamFromName'
import { OnGoingMatchContext } from '../../contexts/OnGoingMatchContext'
import { Match } from '../../types/Match'

export default function OnGoingMatch() {
  const { activeGame } = useContext(GameContext)
  const { initiateMatch, onGoingMatch } = useContext(OnGoingMatchContext)

  let currentMatch: Match
  const currentRound = activeGame?.data.currentWeek

  if (onGoingMatch.state === 'initiated') {
    currentMatch = onGoingMatch.activeMatch!
  } else if (onGoingMatch.state === 'not initiated') {
    currentMatch =
      activeGame!.data.tournments[0].rounds[currentRound!].matches[0]

    initiateMatch(currentMatch)
  } else currentMatch = onGoingMatch.activeMatch!

  const homeTeam = getTeamFromName(activeGame!.data, currentMatch.homeTeam)
  const visitorTeam = getTeamFromName(
    activeGame!.data,
    currentMatch.visitorTeam,
  )

  return (
    <>
      <h1>On Going Match</h1>
      <span></span>
      <span>{homeTeam?.name}</span> - <span>{visitorTeam?.name}</span>
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
    </>
  )
}
