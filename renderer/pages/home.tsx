import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'

import createClient from '../ssb'

function Home() {
  useEffect(() => {
    ;(async () => {
      console.log('halllooooo')
      const client = await createClient()
      console.log('client', client)
      console.log(client.whoami())
    })()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Peach Social</title>
      </Head>
      <div>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  )
}

export default Home
