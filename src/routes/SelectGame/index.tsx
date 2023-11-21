import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { createNewGame, listExistingGames } from '../../api/game'
import { GameRef } from '../../types/Game'
import { GameContext } from '../../contexts/GameContext'
import Home from '../Home'

export default function SelectGame() {
  const [games, setGames] = useState<GameRef[]>([])
  const { activeUser } = useContext(UserContext)
  const { activeGame, selectGame } = useContext(GameContext)

  const navigate = useNavigate()

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

  if (!activeUser.data) navigate('/sign-in')

  if (activeGame) return <Home />

  return (
    <>
      <h1>Select game</h1>
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
