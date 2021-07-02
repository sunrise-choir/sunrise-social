import React from 'react'

import PeerProfile from '@/components/PeerProfile'
import { useGetCurrentPeerQuery } from '@/graphql'

export default function CurrentPeerProfile() {
  const { loading, error, data } = useGetCurrentPeerQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { currentPeer } = data
  const { feedId } = currentPeer

  return <PeerProfile feedId={feedId} isSelf />
}
