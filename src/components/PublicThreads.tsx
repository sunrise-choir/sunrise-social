import { Box, VStack } from '@chakra-ui/react'
import React from 'react'

import { Post, Thread, useGetPublicThreadsQuery } from '@/graphql'

interface PublicThreadsProps {}

export default function PublicThreads(_props: PublicThreadsProps) {
  const { loading, error, data } = useGetPublicThreadsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  if (data == null) return null

  const { threads } = data

  return (
    <VStack>
      {threads.map((thread, index) => (
        <PublicThread key={index} thread={thread} />
      ))}
    </VStack>
  )
}

interface PublicThreadProps {
  thread: Thread
}
function PublicThread(props: PublicThreadProps) {
  const { thread } = props
  const { posts } = thread
  return (
    <Box>
      {posts.map((post) => (
        <PublicPost key={post.id} post={post} />
      ))}
    </Box>
  )
}

interface PublicPostProps {
  post: Post
}

function PublicPost(props: PublicPostProps) {
  const { post } = props
  const { id, text } = post

  return (
    <Box>
      <Box>{id}</Box>
      <Box>{text}</Box>
    </Box>
  )
}
