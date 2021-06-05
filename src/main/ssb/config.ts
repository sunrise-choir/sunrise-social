import { app } from 'electron'
import { join } from 'path'
import Config from 'ssb-config/inject'
import Keys from 'ssb-keys'

export default function createSsbConfig() {
  const userData = app.getPath('userData')
  const ssbDir = join(userData, 'ssb')

  const keysPath = join(ssbDir, 'secret')
  const keys = Keys.loadOrCreateSync(keysPath)

  return Config('ssb', {
    blobs: {
      sympathy: 2,
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
