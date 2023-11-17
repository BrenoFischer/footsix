import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { signOutUser } from '../../api/authentication'
import { GameContext } from '../../contexts/GameContext'

export default function Header() {
  const { activeUser, clearUser } = useContext(UserContext)
  const { deselectGame } = useContext(GameContext)

  async function handleSignOut() {
    await signOutUser()
    clearUser()
    deselectGame()
  }
  return (
    <>
      <div>
        {activeUser ? (
          <button onClick={handleSignOut}>Sign out</button>
        ) : (
          <button>Sign In</button>
        )}
      </div>
      <Outlet />
    </>
  )
}
