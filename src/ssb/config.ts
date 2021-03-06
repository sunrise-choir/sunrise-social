import { app } from 'electron'
import { join } from 'path'
import Config from 'ssb-config/inject'
import Keys from 'ssb-keys'

export default function createSsbConfig() {
  const userData = app.getPath('userData')
  console.log('userData', userData)
  const ssbDir = join(userData, 'ssb')

  const keysPath = join(ssbDir, 'secret')
  const keys = Keys.loadOrCreateSync(keysPath)

  return Config('ssb', {
    blobs: {
      sympathy: 2,
    },
    connections: {
      incoming: {
        net: [{ port: 55698, scope: ['public', 'local'], transform: 'shs' }],
      },
      outgoing: {
        net: [{ transform: 'shs' }],
      },
    },
    /*
    conn: {
      autostart: false,
    },
    */
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
}
