import React from 'react'

import PageLayout from '@/components/PageLayout'
import PeerProfile from '@/components/PeerProfile'
import { useRouterContext } from '@/context/router'

export default Profile

function Profile() {
  const { match } = useRouterContext()

  if (match == null) return null

  const {
    params: { feedId: urlSafeFeedId },
  } = match

  const feedId = urlSafeFeedId.replace(/-/g, '+').replace(/_/g, '/')

  return (
    <PageLayout>
      <PeerProfile feedId={feedId} />
    </PageLayout>
  )
}
