import { IResolvers } from 'apollo-server'

import { Context } from './'

const resolvers: IResolvers<any, Context> = {
  Query: {
    currentAgent: (parent, args, { ssb }, info) => {
      const { id } = ssb.whoami()
      return { feedId: id }
    },
  },
}

export default resolvers
