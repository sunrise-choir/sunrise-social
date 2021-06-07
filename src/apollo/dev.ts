import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { Context } from './'

interface Options {
  schema: any
  context: Context
}

export default function createApolloDevServer(options: Options) {
  const { schema, context } = options

  const app = express()

  app.use(
    '/graphql',
    graphqlHTTP({
      context,
      graphiql: true,
      schema,
    }),
  )

  app.listen(8090, 'localhost', () => {
    console.info(`Development graphql server on http://localhost:8090/graphql`)
  })
}
