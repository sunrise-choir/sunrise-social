import { Resolvers } from '@/graphql/Resolvers'

const resolvers: Resolvers = {
  Query: {
    currentAgent: (_parent, _args, { data: { ssb } }, _info) => {
      const { id } = ssb.whoami()
      return { feedId: id }
    },
  },
}

export default resolvers
