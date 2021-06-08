// import { InMemoryLRUCache } from 'apollo-server-caching'
// import { ApolloError } from 'apollo-server-errors'

import i from 'pull-stream-to-async-iterator'
import {
  Address as SsbConnHubAddress,
  ConnectionData as SsbConnHubConnectionData,
} from 'ssb-conn-hub/lib/types'
import { promisify as p } from 'util'

import {
  PeerConnection,
  PeerConnectionState,
  Profile,
  Scalars,
} from '@/graphql'
import { SsbServer } from '@/ssb'

type FeedId = Scalars['FeedId']

export interface SsbDataConfig {
  ssb: SsbServer
}

export function SsbData(config: SsbDataConfig) {
  const { ssb } = config

  // const messageCache = new InMemoryLRUCache()

  return {
    getCurrentFeedId() {
      const { id: feedId } = ssb.whoami()
      return feedId
    },
    async getPeerConnections(): Promise<Array<PeerConnection>> {
      for await (const peerConnection of this.onPeerConnections()) {
        return peerConnection
      }
    },
    async getProfileByFeedId(feedId: FeedId): Promise<Profile> {
      await p(ssb.db.onDrain)('aboutSelf')
      const profile = await ssb.db.getIndex('aboutSelf').getProfile(feedId)
      return profile
    },
    normalizePeerConnectionState(
      state: SsbConnHubConnectionData['state'],
    ): PeerConnectionState {
      switch (state) {
        case 'connecting':
          return PeerConnectionState.Connecting
        case 'connected':
          return PeerConnectionState.Connected
        case 'disconnecting':
          return PeerConnectionState.Disconnecting
      }
    },
    async *onPeerConnections(): AsyncIterator<Array<PeerConnection>> {
      type SsbConnPeer = [SsbConnHubAddress, SsbConnHubConnectionData]
      const ssbConnPeersIter: AsyncIterator<Array<SsbConnPeer>> = i(
        ssb.conn.peers(),
      )
      for await (const ssbConnPeers of ssbConnPeersIter) {
        yield ssbConnPeers.map((ssbConnPeer: SsbConnPeer) => {
          console.log('peer', ssbConnPeer)
          const [address, connection] = ssbConnPeer
          console.log('ssb connection', connection)
          const { key: feedId, state, type, inferredType } = connection
          return {
            address,
            peer: {
              feedId: feedId as FeedId,
            },
            state: this.normalizePeerConnectionState(state),
            type: type || inferredType,
          }
        })
      }
    },
  }
}

export default SsbData
