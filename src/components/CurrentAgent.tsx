import React from 'react'

import { useGetCurrentAgentQuery } from '@/graphql'

export default function CurrentAgent() {
  const { loading, error, data } = useGetCurrentAgentQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return

  const { currentAgent } = data
  const { feedId } = currentAgent

  return <div>{feedId}</div>
}
