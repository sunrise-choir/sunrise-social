import ssbClient from 'electron-ssb-client'
import ssbDeweirdConsumer from 'ssb-deweird/consumer'

import manifest from './manifest'

function createClient() {
  return ssbClient(manifest).use(ssbDeweirdConsumer).callPromise()
}

type PromiseInnerType<P> = P extends Promise<infer T> ? T : never

export type SsbClient = PromiseInnerType<ReturnType<typeof createClient>>

export default createClient
