import React from 'react'
import { useUsersQuery } from 'generated/graphql'

const Home: React.FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' })

  return (
    <div>
      {!data ? <div>loading...</div> : (
        <>
          <div>Users</div>
          <ul>
            {data.users.map(({ id, email }) => (
              <li key={`user-${id}`}>{`${email} (${id})`}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Home