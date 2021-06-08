import React from 'react'

import { useGetCurrentPeerQuery } from '@/graphql'

export default function CurrentPeer() {
  const { loading, error, data } = useGetCurrentPeerQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { currentPeer } = data
  const { feedId } = currentPeer

  return <div>{feedId}</div>
}
