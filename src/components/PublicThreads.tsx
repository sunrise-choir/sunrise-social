import { Box, StackDivider, VStack } from '@chakra-ui/react'
import React from 'react'

import {
  Message,
  Post,
  Scalars,
  Thread,
  useGetPublicThreadsQuery,
} from '@/graphql'

interface PublicThreadsProps {}

export default function PublicThreads(_props: PublicThreadsProps) {
  const { loading, error, data } = useGetPublicThreadsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  if (data == null) return null

  const { threads } = data

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} align="stretch">
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
  const { messages } = thread
  return (
    <Box>
      {messages.map((message) => (
        <PublicMessage key={message.id} message={message} />
      ))}
    </Box>
  )
}

interface PublicMessageProps {
  message: Message
}

function PublicMessage(props: PublicMessageProps) {
  const { message } = props
  const { id, content } = message

  if (content == null) throw new Error('undefined content')

  const { __typename } = content

  switch (__typename) {
    case 'Post':
      return <PublicPost id={id} post={content} />
    default:
      return <Box>???</Box>
  }
}

interface PublicPostProps {
  id: Scalars['MessageId']
  post: Post
}

function PublicPost(props: PublicPostProps) {
  const { id, post } = props
  const { text } = post

  return (
    <Box>
      <Box>{id}</Box>
      <Box>{text}</Box>
    </Box>
  )
}
