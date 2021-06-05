import { InMemoryLRUCache } from 'apollo-server-caching'

import { SsbServer } from '@/main/ssb'
// import { ApolloError } from 'apollo-server-errors'

export interface SsbDataConfig {
  ssb: SsbServer
}

export function SsbData(config: SsbDataConfig) {
  const { ssb } = config

  const messageCache = new InMemoryLRUCache()

  return {
    whoami: () => ssb.whoami(),
  }
}

export default SsbData
