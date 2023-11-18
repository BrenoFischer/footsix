import { ReactNode, createContext, useContext, useState } from 'react'
import { OnGoingMatch } from '../types/OnGoingMatch'
import { Match } from '../types/Match'
import { generateFirstMatchRound } from '../utils/generateFirstMatchRound'
import { GameContext } from './GameContext'

interface OnGoingMatchContextType {
  onGoingMatch: OnGoingMatch
  initiateMatch: (match: Match) => void
}

export const OnGoingMatchContext = createContext({} as OnGoingMatchContextType)

interface OnGoingMatchContextProviderProps {
  children: ReactNode
}

export function OnGoingMatchContextProvider({
  children,
}: OnGoingMatchContextProviderProps) {
  const { activeGame } = useContext(GameContext)
  const [onGoingMatch, setOnGoingMatch] = useState<OnGoingMatch>({
    state: 'not initiated',
    activeMatch: null,
  })

  function initiateMatch(match: Match) {
    if (onGoingMatch.state !== 'initiated') {
      const firstRound = generateFirstMatchRound(match, activeGame!.data)

      match.rounds.push(firstRound)
      match.matchInitiated = true
      match.currentRound = 1

      setOnGoingMatch({
        state: 'initiated',
        activeMatch: match,
      })
    }
  }

  return (
    <OnGoingMatchContext.Provider value={{ onGoingMatch, initiateMatch }}>
      {children}
    </OnGoingMatchContext.Provider>
  )
}
