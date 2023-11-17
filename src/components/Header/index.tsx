import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { signOutUser } from '../../api/authentication'

export default function Header() {
  const { activeUser, clearUser } = useContext(UserContext)

  async function handleSignOut() {
    await signOutUser()
    clearUser()
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
