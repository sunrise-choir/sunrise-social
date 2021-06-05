/* eslint-env node */

import { ipcMain } from 'electron'
import noauthTransformPlugin from 'multiserver/plugins/noauth'
import wsTransportPlugin from 'multiserver/plugins/ws'
import electronIpcPlugin from 'multiserver-electron-ipc'

export default function multiserverAddons(
  webContentsPromise: (wc: any) => void | undefined,
) {
  return (ssb: any, cfg: any) => {
    ssb.multiserver.transform({
      create: () =>
        noauthTransformPlugin({
          keys: { publicKey: Buffer.from(cfg.keys.public, 'base64') },
        }),
      name: 'noauth',
    })

    ssb.multiserver.transport({
      create: () => wsTransportPlugin({}),
      name: 'ws',
    })

    try {
      ssb.multiserver.transport({
        create: () => electronIpcPlugin({ ipcMain, webContentsPromise }),
        name: 'channel',
      })
    } catch (err) {
      console.error(err)
    }
  }
}
