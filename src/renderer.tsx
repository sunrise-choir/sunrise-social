import { ApolloProvider } from '@apollo/client'
import React, { useMemo } from 'react'
import { render } from 'react-dom'

import createApolloClient from '@/apollo/client'
import CurrentAgent from '@/components/CurrentAgent'

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
      <CurrentAgent />
    </ApolloProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'))
})
