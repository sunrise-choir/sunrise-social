import { app, BrowserWindow, shell } from 'electron'
import installExtension, {
  APOLLO_DEVELOPER_TOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'
import { join as joinPath } from 'path'
import { format as formatUrl } from 'url'

import createApolloServer from './apollo'
import indexHtml from './index.html'
import createSsbServer from './ssb'

const isDevelopment = process.env.NODE_ENV !== 'production'

if (isDevelopment) {
  app.setPath('userData', `${app.getPath('userData')}-development`)
}

function createServer() {
  const ssb = createSsbServer()
  createApolloServer({ ssb })
}

createServer()

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: joinPath(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadURL(
    formatUrl({
      pathname: joinPath(__dirname, indexHtml),
      protocol: 'file',
      slashes: true,
    }),
  )

  // handle external (web) links
  // TODO: https://www.electronjs.org/docs/tutorial/security#14-do-not-use-openexternal-with-untrusted-content
  mainWindow.webContents.on('will-navigate', (event: any, url: string) => {
    if (url !== event.sender.getURL()) {
      event.preventDefault()
      setImmediate(() => {
        shell.openExternal(url)
      })
    }
  })
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    setImmediate(() => {
      shell.openExternal(url)
    })

    return { action: 'deny' }
  })

  return mainWindow
}

// create main BrowserWindow when electron is ready
app.whenReady().then(createMainWindow)

if (isDevelopment) {
  app
    .whenReady()
    .then(() => {
      return installExtension([REACT_DEVELOPER_TOOLS, APOLLO_DEVELOPER_TOOLS], {
        forceDownload: false,
        loadExtensionOptions: { allowFileAccess: true },
      })
    })
    .then(() => {
      console.log('installed dev extensions')
    })
    .catch((error) => {
      console.error('error installing extensions:', error)
    })
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
