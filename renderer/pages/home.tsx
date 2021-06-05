import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import React, { useMemo } from 'react'

import createApolloClient from '../apollo'
import CurrentAgent from '../components/CurrentAgent'

function Home() {
  const client = useMemo(() => createApolloClient(), [])

  return (
    <React.Fragment>
      <Head>
        <title>Peach Social</title>
      </Head>
      <ApolloProvider client={client}>
        <CurrentAgent />
      </ApolloProvider>
    </React.Fragment>
  )
}

export default Home
