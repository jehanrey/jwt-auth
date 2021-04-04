import React from 'react'
import { useByeQuery } from 'generated/graphql'

const Home: React.FC = () => {
  const { data, loading, error } = useByeQuery({ fetchPolicy: 'network-only' })

  if (loading) return <div>loading...</div>

  if (error) {
    console.log(error)
    return <div>Error</div>
  }

  if (!data) return <div>No data</div>

  return (
    <div>{data.bye}</div>
  )
}

export default Home