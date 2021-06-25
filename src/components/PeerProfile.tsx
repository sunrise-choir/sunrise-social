import React from 'react'

import { Peer, useGetPeerProfileQuery } from '@/graphql'

interface PeerProfileProps {
  feedId: Peer['feedId']
}

export default function PeerProfile(props: PeerProfileProps) {
  const { feedId } = props

  const { loading, error, data } = useGetPeerProfileQuery({
    variables: { feedId },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { peer } = data

  if (peer == null) return null

  return <div>{peer.feedId}</div>
}
