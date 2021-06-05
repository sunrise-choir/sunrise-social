import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ipcRenderer } from 'electron'
import { createIpcLink } from 'graphql-transport-electron'

export default function createApolloClient() {
  const link = createIpcLink({ ipc: ipcRenderer })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })

  return client
}
