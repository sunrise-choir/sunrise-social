import { makeExecutableSchema } from 'apollo-server'
import { ipcMain } from 'electron'
import { createIpcExecutor, createSchemaLink } from 'graphql-transport-electron'

import { SsbServer } from '../ssb'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

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
    resolvers,
    typeDefs,
  })
  const context = () => ({ ssb })
  const link = createSchemaLink({
    context,
    schema,
  })

  createIpcExecutor({ ipc: ipcMain, link })
}
