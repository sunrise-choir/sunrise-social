import React from 'react'

import { useGetCurrentAgentQuery } from '@/graphql'

import EditProfileImage from './EditProfileImage'

export default function CurrentAgent() {
  const { loading, error, data } = useGetCurrentAgentQuery()

  console.log('data', data)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  if (data == null) return null

  const { currentAgent } = data
  const { feedId } = currentAgent

  return (
    <div>
      {feedId}
      <EditProfileImage feedId={feedId} />
    </div>
  )
}
