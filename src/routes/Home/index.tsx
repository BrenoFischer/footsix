import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { Link } from 'react-router-dom'

export default function Home() {
  const { activeGame } = useContext(GameContext)

  const tournments = activeGame?.data.tournments
  const currentWeek = activeGame?.data.currentWeek
  const nextMatch = tournments![0].rounds[currentWeek!].matches[0]

  return (
    <>
      <h1>Home</h1>
      <p>Active Game: {activeGame?.id}</p>
      {tournments &&
        tournments[0].teams.map((team) => <p key={team}>{team}</p>)}
      <h2>Next Match:</h2>
      {nextMatch.homeTeam} X {nextMatch.visitorTeam}
      <Link to={'onGoingMatch'}>Play next match</Link>
    </>
  )
}
