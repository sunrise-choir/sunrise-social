// import { InMemoryLRUCache } from 'apollo-server-caching'
// import { ApolloError } from 'apollo-server-errors'

import { SsbServer } from '@/ssb'

export interface SsbDataConfig {
  ssb: SsbServer
}

export function SsbData(config: SsbDataConfig) {
  const { ssb } = config

  // const messageCache = new InMemoryLRUCache()

  return {
    whoami: () => ssb.whoami(),
  }
}

export default SsbData
