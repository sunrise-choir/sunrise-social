import { Button } from '@chakra-ui/react'
import React, { useCallback } from 'react'

import { Followship, Scalars, useSetFollowshipMutation } from '@/graphql'

interface FollowshipButtonProps {
  feedId: Scalars['FeedId']
}

export default function FollowshipButton(props: FollowshipButtonProps) {
  const { feedId } = props

  const [setFollowshipMutation, { data, loading, error }] =
    useSetFollowshipMutation({
      // @ts-ignore
      variables: {
        feedId,
      },
    })

  const handleClick = useCallback(() => {
    setFollowshipMutation({
      // @ts-ignore
      variables: {
        followship: Followship.Following,
      },
    })
  }, [setFollowshipMutation])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  console.log('data', data)

  return <Button onClick={handleClick}>follow</Button>
}
