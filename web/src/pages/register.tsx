import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useRegisterMutation } from 'generated/graphql'

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register] = useRegisterMutation()

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await register({ variables: { email, password }})
    console.log({ response })
    history.push('/')
  }

  return (
    <form onSubmit={submitRegister}>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default Register