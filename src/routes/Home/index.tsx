import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Login from '../Login'
import { createNewGame, listExistingGames } from '../../api/game'
import { GameRef } from '../../types/Game'
import { GameContext } from '../../contexts/GameContext'

export default function Home() {
  const [games, setGames] = useState<GameRef[]>([])
  const { activeUser } = useContext(UserContext)
  const { activeGame, selectGame } = useContext(GameContext)

  useEffect(() => {
    async function getGames() {
      if (activeUser.state === 'completed' && activeUser.data) {
        const gamesFromDatabase = await listExistingGames(activeUser.data.uid)
        setGames(gamesFromDatabase)
      }
    }

    getGames()
  }, [activeUser])

  async function handleCreateNewGame() {
    if (activeUser.state === 'completed' && activeUser.data) {
      await createNewGame(activeUser.data.uid)
      const gamesFromDatabase = await listExistingGames(activeUser.data.uid)
      setGames(gamesFromDatabase)
    }
  }

  function handleSelectGame(game: GameRef) {
    selectGame(game)
  }

  if (activeUser.state === 'gathering') return <h1>Gathering Data</h1>

  if (!activeUser.data) return <Login />

  if (activeGame) return <h1>Game Active</h1>

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleCreateNewGame}>Create New Game</button>
      <ul>
        {games.map((game) => (
          <li
            key={game.id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSelectGame(game)}
          >
            {game.id}
          </li>
        ))}
      </ul>
    </>
  )
}
