import { makeExecutableSchema } from 'apollo-server'
import { ipcMain } from 'electron'
import { createIpcExecutor, createSchemaLink } from 'graphql-transport-electron'

import * as scalars from '@/graphql/scalars'
import typeDefs from '@/graphql/schema.graphql'

import { SsbServer } from '../ssb'
import resolvers from './resolvers'

console.log('resolvers', resolvers)

interface ApolloServerOptions {
  ssb: SsbServer
}

export interface Context {
  ssb: SsbServer
}

export default function createApolloServer(options: ApolloServerOptions) {
  const { ssb } = options

  const schema = makeExecutableSchema({
    resolvers: {
      ...scalars,
      ...resolvers,
    },
    typeDefs,
  })
  const context = () => ({ ssb })
  const link = createSchemaLink({
    context,
    schema,
  })

  createIpcExecutor({ ipc: ipcMain, link })
}
