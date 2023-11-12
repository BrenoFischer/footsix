import { ReactNode, createContext, useState, useEffect } from 'react'
import { onAuthStateChangeListener } from '../api/authentication'
import { User } from 'firebase/auth'

interface UserContextType {
  activeUser: null | User
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [activeUser, setActiveUser] = useState<null | User>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setActiveUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={{ activeUser }}>
      {children}
    </UserContext.Provider>
  )
}
