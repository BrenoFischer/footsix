import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import getTeamFromName from '../../utils/getTeamFromName'

export default function OnGoingMatch() {
  const { activeGame } = useContext(GameContext)

  const currentRound = activeGame?.data.currentWeek
  const onGoingMatch =
    activeGame!.data.tournments[0].rounds[currentRound!].matches[0]

  const homeTeam = getTeamFromName(activeGame!.data, onGoingMatch.homeTeam)
  const visitorTeam = getTeamFromName(
    activeGame!.data,
    onGoingMatch.visitorTeam,
  )
  const homeTeamScore = onGoingMatch?.homeTeamScore
  const visitorTeamScore = onGoingMatch?.visitorTeamScore

  const homeTeamPlayers = homeTeam?.players
  const visitorTeamPlayers = visitorTeam?.players

  return (
    <>
      <h1>On Going Match</h1>
      <span></span>
      <span>{homeTeam?.name}</span> - <span>{visitorTeam?.name}</span>
      <span>{homeTeamScore}</span>X<span>{visitorTeamScore}</span>
      <div style={{ display: 'flex' }}>
        <ul>
          {homeTeamPlayers?.map((player, idx) => {
            return <li key={player.name + idx}>{player.name}</li>
          })}
        </ul>
        <ul>
          {visitorTeamPlayers?.map((player, idx) => {
            return <li key={player.name + idx}>{player.name}</li>
          })}
        </ul>
      </div>
    </>
  )
}
