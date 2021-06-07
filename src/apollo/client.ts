// loaded by renderer

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createIpcLink } from 'graphql-transport-electron'

// provided by preload
const ipcRenderer = (window as any).ipcRenderer

export default function createApolloClient() {
  const ipcLink = createIpcLink({ ipc: ipcRenderer })
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ipcLink,
  })

  return client
}
