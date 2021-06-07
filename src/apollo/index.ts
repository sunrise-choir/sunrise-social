import { makeExecutableSchema } from 'apollo-server'
import { ipcMain } from 'electron'
import { createIpcExecutor, createSchemaLink } from 'graphql-transport-electron'

import * as scalars from '@/graphql/scalars'
import typeDefs from '@/graphql/schema.graphql'

import { SsbServer } from '../ssb'
import Data from './data'
import createApolloDevServer from './dev'
import resolvers from './resolvers'

const isDevelopment = process.env.NODE_ENV !== 'production'

interface ApolloServerOptions {
  ssb: SsbServer
}

export interface Context {
  data: Data
}

export default function createApolloServer(options: ApolloServerOptions) {
  const { ssb } = options

  const data = Data({ ssb })
  const schema = makeExecutableSchema({
    resolvers: {
      ...scalars,
      ...resolvers,
    },
    typeDefs,
  })
  const context = { data }

  if (isDevelopment) {
    createApolloDevServer({ context, schema })
  }

  const link = createSchemaLink({
    context: () => context,
    schema,
  })

  createIpcExecutor({ ipc: ipcMain, link })
}
