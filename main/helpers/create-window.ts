import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  screen,
  shell,
} from 'electron'
import Store from 'electron-store'

export default (
  windowName: string,
  options: BrowserWindowConstructorOptions,
): BrowserWindow => {
  const key = 'window-state'
  const name = `window-state-${windowName}`
  const store = new Store({ name })
  const defaultSize = {
    height: options.height,
    width: options.width,
  }
  let state = {}
  let win

  const restore = () => store.get(key, defaultSize)

  const getCurrentPosition = () => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      height: size[1],
      width: size[0],
      x: position[0],
      y: position[1],
    }
  }

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    })
  }

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds)
    })
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults()
    }
    return windowState
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    store.set(key, state)
  }

  state = ensureVisibleOnSomeDisplay(restore())

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      ...options.webPreferences,
    },
  }
  win = new BrowserWindow(browserOptions)

  // Handle external (web) links
  win.webContents.on('will-navigate', (ev: any, url: string) => {
    if (url !== ev.sender.getURL()) {
      ev.preventDefault()
      shell.openExternal(url)
    }
  })

  win.on('close', saveState)

  return win
}
