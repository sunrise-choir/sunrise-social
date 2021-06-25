import { Box, VStack } from '@chakra-ui/react'
import React from 'react'

import { PeerConnection, useGetPeerConnectionsQuery } from '@/graphql'

export default function PeerConnectionsList() {
  const { loading, error, data } = useGetPeerConnectionsQuery({
    pollInterval: 500,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { peerConnections } = data

  return (
    <VStack>
      {peerConnections.map((peerConnection) => (
        <PeerConnectionItem
          key={peerConnection.peer.feedId}
          peerConnection={peerConnection}
        />
      ))}
    </VStack>
  )
}

interface PeerConnectionProps {
  peerConnection: PeerConnection
}
function PeerConnectionItem(props: PeerConnectionProps) {
  const { peerConnection } = props
  const {
    peer: { feedId },
    address,
    state,
    type,
  } = peerConnection
  return (
    <Box boxShadow="outline">
      <Box>{feedId}</Box>
      <Box>{address}</Box>
      <Box>{state}</Box>
      <Box>{type}</Box>
    </Box>
  )
}
