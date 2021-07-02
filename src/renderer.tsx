import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import React, { ReactNode, useMemo } from 'react'
import { render } from 'react-dom'

import createApolloClient from '@/apollo/client'
import AppLayout from '@/components/AppLayout'
// import CurrentPeer from '@/components/CurrentPeer'
// import PeerConnections from '@/components/PeerConnections'
import PageRouter from '@/components/PageRouter'
import { RouterContextProvider } from '@/context/router'
import { initialRouteId, routes } from '@/pages'
import theme from '@/theme'

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'))
})

function App() {
  /*
  <Head>
    <title>Peach Social</title>
  </Head>
  
        <CurrentPeer />
        <PeerConnections />
  */

  return (
    <Provider>
      <AppLayout>
        <PageRouter />
      </AppLayout>
    </Provider>
  )
}

interface ProviderProps {
  children: ReactNode
}

function Provider(props: ProviderProps) {
  const { children } = props

  const client = useMemo(() => createApolloClient(), [])

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <RouterContextProvider routes={routes} initialRouteId={initialRouteId}>
          {children}
        </RouterContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
