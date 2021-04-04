import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from '@apollo/client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'

import { getAccessToken, setAccessToken } from './globals'
import App from './app'

interface IToken {
  exp: number
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

const requestLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()
  operation.setContext({
    headers: {
      authorization: !!accessToken ? `bearer ${accessToken}` : ''
    }
  })
  return forward(operation)
})

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if (!token) return true
    try {
      const { exp } = jwtDecode<IToken>(token)
      return !(Date.now() >= exp * 1000)
    } catch {
      return false
    }
  },
  fetchAccessToken: () => fetch('http://localhost:4000/refresh_token', {
    method: 'POST',
    credentials: 'include',
  }),
  handleFetch: accessToken => setAccessToken(accessToken),
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    tokenRefreshLink,
    requestLink,
    httpLink,
  ]),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)