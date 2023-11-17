import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Login from '../Login'
import { createNewGame, listExistingGames } from '../../api/game'
import { GameRef } from '../../types/Game'

export default function Home() {
  const [games, setGames] = useState<GameRef[]>([])
  const { activeUser } = useContext(UserContext)

  useEffect(() => {
    async function getGames() {
      if (activeUser) {
        const gamesFromDatabase = await listExistingGames(activeUser.uid)
        setGames(gamesFromDatabase)
      }
    }

    getGames()
  }, [activeUser])

  async function handleCreateNewGame() {
    if (activeUser) {
      await createNewGame(activeUser.uid)
      const gamesFromDatabase = await listExistingGames(activeUser.uid)
      setGames(gamesFromDatabase)
    }
  }

  return (
    <>
      {activeUser ? (
        <>
          <h1>Home</h1>
          <button onClick={handleCreateNewGame}>Create New Game</button>
          <ul>
            {games.map((game) => (
              <li key={game.id}>{game.id}</li>
            ))}
          </ul>
        </>
      ) : (
        <Login />
      )}
    </>
  )
}
