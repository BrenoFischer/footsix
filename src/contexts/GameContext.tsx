import { ReactNode, createContext, useState } from 'react'
import { GameRef } from '../types/Game'

interface GameContextType {
  activeGame: GameRef | null
  selectGame: (game: GameRef) => void
  deselectGame: () => void
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

  return (
    <GameContext.Provider value={{ activeGame, selectGame, deselectGame }}>
      {children}
    </GameContext.Provider>
  )
}
