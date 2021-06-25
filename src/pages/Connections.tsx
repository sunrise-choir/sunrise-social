import React from 'react'

import PageLayout from '@/components/PageLayout'
import PeerConnectionsList from '@/components/PeerConnectionsList'

export default Connections

function Connections() {
  return (
    <PageLayout>
      <PeerConnectionsList />
    </PageLayout>
  )
}
