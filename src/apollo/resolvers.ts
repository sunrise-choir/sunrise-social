import { Resolvers } from '@/graphql/Resolvers'

const resolvers: Resolvers = {
  Mutation: {
    setFollowship(_parent, args, { data: { ssb } }, _info) {
      const { feedId, followship } = args
      return ssb.setFollowship({ feedId, followship })
    },
  },
  Peer: {
    profile(peer, _args, { data: { ssb } }, _info) {
      const { feedId } = peer
      return ssb.getProfileByFeedId(feedId)
    },
  },
  Query: {
    currentPeer(_parent, _args, { data: { ssb } }, _info) {
      const feedId = ssb.getCurrentFeedId()
      return { feedId }
    },
    peerByFeedId(_parent, args, _context, _info) {
      const { feedId } = args
      return { feedId }
    },
    peerConnections(_parent, _args, { data: { ssb } }, _info) {
      return ssb.getPeerConnections()
    },
    threads(_parent, _args, { data: { ssb } }, _info) {
      return ssb.getThreads()
    },
  },
}

export default resolvers
