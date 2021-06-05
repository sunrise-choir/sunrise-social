import { gql, useQuery } from '@apollo/client'
import React from 'react'

const GET_CURRENT_AGENT = gql`
  query GetCurrentAgent {
    currentAgent
  }
`

export default function CurrentAgent() {
  const { loading, error, data } = useQuery(GET_CURRENT_AGENT)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return <div>{data}</div>
}
