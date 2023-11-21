import { ReactNode, createContext, useState } from 'react'
import { GameRef } from '../types/Game'
import { Match } from '../types/Match'
import { generateFirstMatchRound } from '../utils/generateFirstMatchRound'

interface GameContextType {
  activeGame: GameRef | null
  selectGame: (game: GameRef) => void
  deselectGame: () => void
  getOnGoingMatch: () => null | Match
  initiateOnGoingMatch: (match: Match) => void
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

  function getOnGoingMatch() {
    if (!activeGame) return null
    return activeGame.data.onGoingMatch.activeMatch
  }

  function initiateOnGoingMatch(match: Match) {
    if (!activeGame) return null
    if (activeGame.data.onGoingMatch.state !== 'initiated') {
      const firstRound = generateFirstMatchRound(match, activeGame.data)

      const updatedGame: GameRef = {
        ...activeGame,
        data: {
          ...activeGame.data,
          onGoingMatch: {
            activeMatch: {
              ...match,
              rounds: [firstRound],
              matchInitiated: true,
              currentRound: 0,
            },
            state: 'initiated',
          },
        },
      }

      setActiveGame(updatedGame)
    }
  }

  return (
    <GameContext.Provider
      value={{
        activeGame,
        selectGame,
        deselectGame,
        getOnGoingMatch,
        initiateOnGoingMatch,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
