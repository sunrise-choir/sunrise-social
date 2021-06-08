import { ApolloProvider } from '@apollo/client'
import React, { useMemo } from 'react'
import { render } from 'react-dom'

import createApolloClient from '@/apollo/client'
import CurrentPeer from '@/components/CurrentPeer'
import PeerConnections from '@/components/PeerConnections'

function App() {
  const client = useMemo(() => createApolloClient(), [])

  /*
  <Head>
    <title>Peach Social</title>
  </Head>
  
  */

  console.log('client', client)

  return (
    <ApolloProvider client={client}>
      <CurrentPeer />
      <PeerConnections />
    </ApolloProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'))
})
