import { GraphQLID, GraphQLScalarType } from 'graphql'

export const BlobId = new GraphQLScalarType({
  ...GraphQLID,
  description: 'Blob Id',
  name: 'FeedId',
})

export const FeedId = new GraphQLScalarType({
  ...GraphQLID,
  description: 'Feed Id',
  name: 'FeedId',
})

export const MessageId = new GraphQLScalarType({
  ...GraphQLID,
  description: 'Message Id',
  name: 'MessageId',
})
