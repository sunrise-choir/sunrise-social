/* eslint-env node */

import SecretStack from 'secret-stack'
import caps from 'ssb-caps'

import createSsbConfig from './config'

export type SsbServer = ReturnType<typeof createSsb>

export default function createSsb() {
  const config = createSsbConfig()

  return (
    SecretStack({ caps })
      // Core
      .use(require('ssb-master'))
      .use(require('ssb-db2'))
      .use(require('ssb-db2/compat/db'))
      .use(require('ssb-db2/compat/ebt'))
      .use(require('ssb-db2/compat/log-stream'))
      .use(require('ssb-db2/compat/history-stream'))
      .use(require('ssb-deweird/producer'))
      // Replication
      .use(require('ssb-replicate')) // needs: db2/compat/log- & history-stream
      .use(require('ssb-friends')) // needs: db, replicate
      //.use(require('ssb-ebt-fork-staltz')) // needs: db2/compat, replicate, friends
      // Connections
      .use(require('ssb-lan'))
      .use(require('ssb-conn')) // needs: db, friends, lan, bluetooth
      //.use(require('ssb-room-client')) // needs: conn
      //.use(require('ssb-http-auth-client')) // needs: conn
      //.use(require('ssb-http-invite-client'))
      //.use(require('ssb-invite-client')) // needs: db, conn
      // Queries
      .use(require('ssb-db2/about-self')) // needs: db2
      .use(require('ssb-threads')) // needs: db, db2, friends
      .use(require('ssb-db2/full-mentions')) // needs: db2
      // Blobs
      .use(require('ssb-blobs'))
      // Customizations
      .call(null, config)
  )
}
