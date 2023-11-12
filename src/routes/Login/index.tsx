import { useState } from 'react'
import { signInAuthUserWithEmailAndPassword } from '../../api/authentication'

export default function Login() {
  const [emailField, setEmailField] = useState('b@gmail.com')
  const [passwordField, setPasswordField] = useState('123456')

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await signInAuthUserWithEmailAndPassword(emailField, passwordField)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
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
    </div>
  )
}
