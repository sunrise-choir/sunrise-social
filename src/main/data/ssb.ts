// import { InMemoryLRUCache } from 'apollo-server-caching'
import mime from 'mime-types'
import pullIdentifyFiletype from 'pull-identify-filetype'
import pull from 'pull-stream'
import { AboutContent } from 'ssb-typescript'
import { promisify as p } from 'util'

import { Blob, Profile } from '@/graphql'
import { SsbServer } from '@/main/ssb'
// import { ApolloError } from 'apollo-server-errors'

export interface SsbDataConfig {
  ssb: SsbServer
}

export function SsbData(config: SsbDataConfig) {
  const { ssb } = config

  // const cache = new InMemoryLRUCache()

  return {
    async getBlob(id: string | null): Promise<Blob | null> {
      if (id == null) return null

      let has = await p(ssb.blobs.has)(id)
      if (!has) {
        has = await p(ssb.blobs.want)(id)
      }
      if (!has) throw new Error('not found')

      let mimeType = 'application/octet-stream'

      return new Promise((resolve, reject) => {
        pull(
          ssb.blobs.get(id),
          pullIdentifyFiletype(function (fileType: string) {
            if (fileType) {
              const _mimeType = mime.lookup(fileType)
              if (_mimeType) mimeType = _mimeType
            }
          }),
          pull.collect((err: Error, buffer: Buffer) => {
            if (err) {
              reject(err)
              return
            }
            console.log('buffer', buffer)
            return {
              mimeType,
              url: '',
            }
          }),
        )
      })
    },
    getCurrentFeedId() {
      const { id: feedId } = ssb.whoami()
      return feedId
    },
    async getProfile(id: string): Promise<Profile> {
      await p(ssb.db.onDrain)('aboutSelf')
      const profile = await ssb.db.getIndex('aboutSelf').getProfile(id)
      const image = await this.getBlob(profile.image)

      return {
        ...profile,
        image,
      }
    },
    async publishProfile(profile: Profile) {
      const { name, description, image } = profile
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      const content: AboutContent = {
        type: 'about',
        about: ssb.whoami(),
        name,
        description,
        image,
      }
      /* eslint-enable sort-keys-fix/sort-keys-fix */
    },
  }
}

export default SsbData
