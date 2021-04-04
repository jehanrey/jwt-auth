import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
} from 'generated/graphql'

import { setAccessToken } from '../globals'

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await login({
      variables: { email, password },
      update: (store, { data }) => {
        if (!data) return null
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data.login.user,
          },
        })
      }
    }).catch(() => {})
    if (response && response.data) setAccessToken(response.data.login.accessToken)
    history.push('/')
  }

  return (
    <form onSubmit={submitLogin}>
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
      <button type="submit">Login</button>
    </form>
  )
}

export default Login