import React from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation, useMeQuery } from 'generated/graphql'
import { setAccessToken } from '../globals'

const Header: React.FC = () => {
  const { data } = useMeQuery()
  const [logout, { client }] = useLogoutMutation()

  const onLogout = async() => {
    await logout()
    setAccessToken('')
    await client!.resetStore()
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/bye">Bye</Link>
      </div>
      <button onClick={onLogout}>logout</button>
      <div>
        {data?.me ? <div>{`Hello, ${data.me.email}`}</div> : null}
      </div>
    </header>
  )
}

export default Header