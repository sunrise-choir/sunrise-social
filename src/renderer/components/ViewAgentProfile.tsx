import React from 'react'

import { useGetAgentByFeedIdQuery } from '@/graphql'

interface ViewAgentProfileProps {
  feedId: string
}

export default function CurrentAgent(props: ViewAgentProfileProps) {
  const { feedId } = props
  const { loading, error, data } = useGetAgentByFeedIdQuery({
    variables: { feedId },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { agent } = data
  const { profile } = agent
  const { name, description, image } = profile
  const { url } = image

  return <div>{feedId}</div>
}
