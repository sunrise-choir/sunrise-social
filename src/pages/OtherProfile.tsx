import React from 'react'

import PageLayout from '@/components/PageLayout'
import PeerProfile from '@/components/PeerProfile'
import { useRouterContext } from '@/context/router'

export default Profile

function Profile() {
  const { match } = useRouterContext()

  if (match == null) return null

  const {
    params: { feedId },
  } = match

  return (
    <PageLayout>
      <PeerProfile feedId={feedId} />
    </PageLayout>
  )
}
