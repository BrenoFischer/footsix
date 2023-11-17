import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export default function Home() {
  const { activeGame } = useContext(GameContext)

  return (
    <>
      <h1>Home</h1>
      <p>Active Game: {activeGame?.id}</p>
    </>
  )
}
