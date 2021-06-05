/* eslint-env node */

import { app } from 'electron'
import { join } from 'path'
import SecretStack from 'secret-stack'
import caps from 'ssb-caps'
import Config from 'ssb-config/inject'
import Keys from 'ssb-keys'

const userData = app.getPath('userData')
const ssbDir = join(userData, 'ssb')

const keysPath = join(ssbDir, 'secret')
const keys = Keys.loadOrCreateSync(keysPath)

const config = Config('ssb', {
  blobs: {
    sympathy: 2,
  },
  conn: {
    autostart: false,
  },
  connections: {
    incoming: {
      channel: [{ scope: 'device', transform: 'noauth' }],
      net: [{ port: 26950, scope: 'private', transform: 'shs' }],
      tunnel: [{ scope: 'public', transform: 'shs' }],
    },
    outgoing: {
      net: [{ transform: 'shs' }],
      tunnel: [{ transform: 'shs' }],
      ws: [{ transform: 'shs' }],
    },
  },
  db2: {
    automigrate: true,
    maxCpu: 91, // %
    maxCpuMaxPause: 120, // ms
    maxCpuWait: 80, // ms
  },
  friends: {
    hops: 2,
  },
  keys,
  path: ssbDir,
})

export default function createSsb(webContentsPromise) {
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
      .use(require('./plugins/multiserver-addons').default(webContentsPromise))
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
      .use(require('ssb-serve-blobs')) // needs: blobs
      // Customizations
      .call(null, config)
  )
}
