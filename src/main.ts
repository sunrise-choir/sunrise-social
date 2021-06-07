import { app, BrowserWindow, shell } from 'electron'
import { join as joinPath } from 'path'
import { format as formatUrl } from 'url'

import createApolloServer from './apollo'
import indexHtml from './index.html'
import createSsbServer from './ssb'

const isDevelopment = process.env.NODE_ENV !== 'production'

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

  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadURL(
    formatUrl({
      pathname: joinPath(__dirname, indexHtml),
      protocol: 'file',
      slashes: true,
    }),
  )

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus()
    setImmediate(() => {
      mainWindow.focus()
    })
  })

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
app.on('ready', createMainWindow)

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

app.on('web-contents-created', (_webContentsEvent, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
