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

  return (
    <>
      {activeUser.state === 'gathering' ? (
        <h1>Gathering Data</h1>
      ) : activeUser.data ? (
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
