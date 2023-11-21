import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { signOutUser } from '../../api/authentication'
import { GameContext } from '../../contexts/GameContext'

export default function Header() {
  const { activeUser, clearUser } = useContext(UserContext)
  const { deselectGame } = useContext(GameContext)
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOutUser()
    clearUser()
    deselectGame()
    navigate('/sign-in')
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
