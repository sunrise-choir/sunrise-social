import React from 'react'

import CurrentPeer from '@/components/CurrentPeer'
import PageLayout from '@/components/PageLayout'

export default Profile

function Profile() {
  return (
    <PageLayout>
      <CurrentPeer />
    </PageLayout>
  )
}
