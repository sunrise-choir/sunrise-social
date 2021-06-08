// loaded by renderer

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createIpcLink } from 'graphql-transport-electron'

// provided by preload
const ipc = (window as any).graphqlIpc

export default function createApolloClient() {
  const ipcLink = createIpcLink({ ipc })
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ipcLink,
  })

  return client
}
