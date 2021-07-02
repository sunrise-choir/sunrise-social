// import { InMemoryLRUCache } from 'apollo-server-caching'
// import { ApolloError } from 'apollo-server-errors'

import pull from 'pull-stream'
import {
  Address as SsbConnHubAddress,
  ConnectionData as SsbConnHubConnectionData,
} from 'ssb-conn-hub/lib/types'
import { ContactContent } from 'ssb-typescript'
import {
  fromFeedSigil,
  fromMultiserverAddress,
  isFeedSSBURI,
  toFeedSigil,
} from 'ssb-uri2'
import { promisify as p } from 'util'

import {
  Followship,
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
      return fromFeedSigil(feedId)
    },
    async getPeerConnections(): Promise<Array<PeerConnection>> {
      return new Promise((resolve, reject) =>
        pull(
          this.onPeerConnections(),
          pull.take(1),
          pull.collect((err: Error, data: [Array<PeerConnection>]) => {
            if (err) reject(err)
            else resolve(data[0])
          }),
        ),
      )
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
    onPeerConnections(): any {
      type SsbConnPeer = [SsbConnHubAddress, SsbConnHubConnectionData]
      return pull(
        ssb.conn.peers(),
        pull.map((ssbConnPeers: Array<SsbConnPeer>) => {
          return ssbConnPeers.map((ssbConnPeer: SsbConnPeer) => {
            const [address, connection] = ssbConnPeer
            const { key: feedId, state, type, inferredType } = connection
            return {
              address: fromMultiserverAddress(address),
              peer: {
                feedId: feedId == null ? null : fromFeedSigil(feedId),
              },
              state: this.normalizePeerConnectionState(state),
              type: type || inferredType,
            }
          })
        }),
      )
    },
    async setFollowship({
      feedId,
      followship,
    }: {
      feedId: FeedId
      followship: Followship
    }): Promise<boolean> {
      if (!isFeedSSBURI(feedId)) {
        // TODO handle with an error
        return false
      }

      let message: ContactContent = {
        contact: toFeedSigil(feedId) as FeedId,
        type: 'contact',
      }
      switch (followship) {
        case Followship.Neutral:
          message.following = false
          message.blocking = false
          break
        case Followship.Following:
          message.following = true
          message.blocking = false
          break
        case Followship.Blocking:
          message.following = false
          message.blocking = true
          break
      }

      const published = await p(ssb.publish)(message)

      console.log('published:')
      console.log(JSON.stringify(published, null, 2))

      return true
    },
  }
}

export default SsbData
