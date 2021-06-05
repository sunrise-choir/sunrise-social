import { gql, useQuery } from '@apollo/client'
import React from 'react'

const GET_CURRENT_AGENT = gql`
  query GetCurrentAgent {
    currentAgent {
      id
    }
  }
`

export default function CurrentAgent() {
  const { loading, error, data } = useQuery(GET_CURRENT_AGENT)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  const { currentAgent } = data
  const { id } = currentAgent

  return <div>{id}</div>
}
