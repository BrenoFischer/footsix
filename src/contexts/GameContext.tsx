import { ReactNode, createContext, useState } from 'react'
import { GameRef } from '../types/Game'

interface GameContextType {
  activeGame: GameRef | null
  selectGame: (game: GameRef) => void
  deselectGame: () => void
  updateGame: (updatedGame: GameRef) => void
}

export const GameContext = createContext({} as GameContextType)

interface GameContextProviderProps {
  children: ReactNode
}

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [activeGame, setActiveGame] = useState<GameRef | null>(null)

  function selectGame(game: GameRef) {
    setActiveGame(game)
  }

  function deselectGame() {
    setActiveGame(null)
  }

  function updateGame(updatedGame: GameRef) {
    setActiveGame(updatedGame)
  }

  return (
    <GameContext.Provider
      value={{
        activeGame,
        selectGame,
        deselectGame,
        updateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
