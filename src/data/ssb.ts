// import { InMemoryLRUCache } from 'apollo-server-caching'
// import { ApolloError } from 'apollo-server-errors'

import { Peer as SsbConnQueryPeer } from 'ssb-conn-query/lib/types'
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
    getPeerConnections(): Array<PeerConnection> {
      return ssb.conn
        .query()
        .peersInConnection()
        .map((ssbConnQueryPeer: SsbConnQueryPeer): PeerConnection => {
          const [address, connection] = ssbConnQueryPeer
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
    },
    async getProfileByFeedId(feedId: FeedId): Promise<Profile> {
      await p(ssb.db.onDrain)('aboutSelf')
      const profile = await ssb.db.getIndex('aboutSelf').getProfile(feedId)
      return profile
    },
    normalizePeerConnectionState(
      state: SsbConnQueryPeer[1]['state'],
    ): PeerConnectionState | undefined {
      switch (state) {
        case undefined:
          return undefined
        case 'connecting':
          return PeerConnectionState.Connecting
        case 'connected':
          return PeerConnectionState.Connected
        case 'disconnecting':
          return PeerConnectionState.Disconnecting
      }
    },
  }
}

export default SsbData
