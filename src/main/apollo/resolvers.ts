import { IResolvers } from 'apollo-server'

import { Context } from './'

const resolvers: IResolvers<any, Context> = {
  Query: {
    currentAgent: async (parent, args, { data: { ssb } }, info) => {
      const feedId = ssb.getCurrentFeedId()
      const profile = await ssb.getProfile(feedId)
      return {
        feedId,
        profile,
      }
    },
  },
}

export default resolvers
