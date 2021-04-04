import React, { useEffect, useState } from 'react'
import Routes from 'routes'

import { setAccessToken } from './globals'

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const { accessToken } = await res.json()
      setAccessToken(accessToken)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  return <Routes />
}

export default App
