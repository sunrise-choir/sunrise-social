import React from 'react'

import CurrentPeerProfile from '@/components/CurrentPeerProfile'
import PageLayout from '@/components/PageLayout'

export default Profile

function Profile() {
  return (
    <PageLayout>
      <CurrentPeerProfile />
    </PageLayout>
  )
}
