import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export default function Home() {
  const { activeGame } = useContext(GameContext)

  const tournments = activeGame?.data.tournments

  return (
    <>
      <h1>Home</h1>
      <p>Active Game: {activeGame?.id}</p>
      {tournments &&
        tournments[0].teams.map((team) => <p key={team}>{team}</p>)}
      <p></p>
    </>
  )
}
