import { VStack } from '@chakra-ui/react'
import React from 'react'

import FollowshipButton from '@/components/FollowshipButton'
import { Peer, useGetPeerProfileQuery } from '@/graphql'

interface PeerProfileProps {
  feedId: Peer['feedId']
  isSelf?: boolean
}

export default function PeerProfile(props: PeerProfileProps) {
  const { feedId, isSelf = false } = props

  const { loading, error, data } = useGetPeerProfileQuery({
    variables: { feedId },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { peer } = data

  if (peer == null) return null

  return (
    <VStack>
      <div>{peer.feedId}</div>
      {!isSelf && <FollowshipButton feedId={feedId} />}
    </VStack>
  )
}
