import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Login from '../Login'

export default function Home() {
  const { activeUser } = useContext(UserContext)

  return <>{activeUser ? <h1>Home</h1> : <Login />}</>
}
