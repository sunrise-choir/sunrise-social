import React from 'react'

import { useGetPeerConnectionsQuery } from '@/graphql'

export default function PeerConnections() {
  const { loading, error, data } = useGetPeerConnectionsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  return <div>{JSON.stringify(data, null, 2)}</div>
}
