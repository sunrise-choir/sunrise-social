/* eslint-env node */

import { app } from 'electron'
import serve from 'electron-serve'

import { createWindow } from './helpers'
import createSsb from './ssb'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')}-development`)
}

let resolveWebContents: ((wc: any) => void) | undefined
// This will be used by multiserver to communicate with the frontend
const webContentsPromise = new Promise((resolve) => {
  resolveWebContents = resolve
})

createSsb(webContentsPromise)

app.on('ready', async () => {
  const mainWindow = createWindow(
    'main',
    {
      height: 600,
      width: 1000,
    },
    resolveWebContents,
  )

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})
