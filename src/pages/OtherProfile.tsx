import React from 'react'

import PageLayout from '@/components/PageLayout'
import PeerProfile from '@/components/PeerProfile'
import { useRouterContext } from '@/context/router'

export default Profile

function Profile() {
  const { state } = useRouterContext()

  const {
    params: { feedId },
  } = state

  // NOTE(mw): this is necessary to avoid an error, but i'm not sure why...
  if (feedId == null) return null

  return (
    <PageLayout>
      <PeerProfile feedId={feedId} />
    </PageLayout>
  )
}
