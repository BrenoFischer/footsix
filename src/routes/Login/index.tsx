import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../api/authentication'

export default function Login() {
  const [emailField, setEmailField] = useState('b@gmail.com')
  const [passwordField, setPasswordField] = useState('123456')
  const [createUserName, setCreateUserName] = useState('User Teste')
  const [createUserEmail, setCreateUserEmail] = useState('b2@gmail.com')
  const [createUserPassword, setCreateUserPassword] = useState('123456')

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await signInAuthUserWithEmailAndPassword(emailField, passwordField)
  }

  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      // @ts-expect-error user property exists on UserCredential
      const { user } = await createAuthUserWithEmailAndPassword(
        createUserEmail,
        createUserPassword,
      )

      await createUserDocFromAuth(user, { displayName: createUserName })
    } catch (error) {
      console.log('Error while creating user', error)
    }
  }

  return (
    <div>
      <h1>Authentication</h1>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          value={emailField}
          type="email"
          onChange={(value) => setEmailField(value.target.value)}
        />
        <input
          value={passwordField}
          onChange={(value) => setPasswordField(value.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleCreateUser}>
        <h2>Create New User</h2>
        <input
          value={createUserName}
          type="text"
          onChange={(value) => setCreateUserName(value.target.value)}
        />
        <input
          value={createUserEmail}
          type="email"
          onChange={(value) => setCreateUserEmail(value.target.value)}
        />
        <input
          value={createUserPassword}
          onChange={(value) => setCreateUserPassword(value.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
