import React, { useMemo } from 'react'
import { render } from 'react-dom'

import createApolloClient from './apollo'
import CurrentAgentProfile from './components/CurrentAgentProfile'
import Provider from './provider'

function App() {
  const client = useMemo(() => createApolloClient(), [])

  /*
  <Head>
    <title>Peach Social</title>
  </Head>
  
  */

  return (
    <Provider client={client}>
      <CurrentAgentProfile />
    </Provider>
  )
}

render(<App />, document.getElementById('app'))
