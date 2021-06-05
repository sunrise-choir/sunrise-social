// https://medium.com/open-graphql/how-to-resolve-import-for-the-graphql-file-with-typescript-and-webpack-7a34c906e4c1
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
