import { ReactNode, createContext, useState } from 'react'
import { OnGoingMatch } from '../types/OnGoingMatch'
import { Match } from '../types/Tournment/Match'

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
  const [onGoingMatch, setOnGoingMatch] = useState<OnGoingMatch>({
    state: 'not initiated',
    activeMatch: null,
  })

  function initiateMatch(match: Match) {
    if (onGoingMatch.state !== 'initiated') {
      setOnGoingMatch({ state: 'initiated', activeMatch: match })
    }
  }

  return (
    <OnGoingMatchContext.Provider value={{ onGoingMatch, initiateMatch }}>
      {children}
    </OnGoingMatchContext.Provider>
  )
}
