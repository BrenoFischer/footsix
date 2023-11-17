import { ReactNode, createContext, useState, useEffect } from 'react'
import { onAuthStateChangeListener } from '../api/authentication'
import { User } from 'firebase/auth'

interface ActiveUserType {
  state: string
  data: null | User
}

interface UserContextType {
  activeUser: ActiveUserType
  clearUser: () => void
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [activeUser, setActiveUser] = useState<ActiveUserType>({
    state: 'gathering',
    data: null,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setActiveUser({ state: 'completed', data: user })
    })

    return unsubscribe
  }, [])

  function clearUser() {
    setActiveUser({ state: 'completed', data: null })
  }

  return (
    <UserContext.Provider value={{ activeUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
