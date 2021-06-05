import { ApolloProvider } from '@apollo/client'
import React, { useMemo } from 'react'
import { render } from 'react-dom'

import createApolloClient from './apollo'
import CurrentAgent from './components/CurrentAgent'

// @ts-ignore
window.React = React

// @ts-ignore
console.log(window.React == window.React2)

console.log('1', window.React)
console.log('2', window.React2)

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

render(<App />, document.getElementById('app'))
