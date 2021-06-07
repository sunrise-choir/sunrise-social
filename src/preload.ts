import { contextBridge, IpcRenderer, ipcRenderer } from 'electron'

// for graphql-transport-electron

interface ExposedIpcRenderer {
  on: IpcRenderer['on']
  removeListener: IpcRenderer['removeListener']
  send: IpcRenderer['send']
}
const exposedIpcRenderer: ExposedIpcRenderer = {
  on(channel, listener) {
    return ipcRenderer.on(channel, listener)
  },
  removeListener(channel, listener) {
    return ipcRenderer.removeListener(channel, listener)
  },
  send(channel, ...args) {
    return ipcRenderer.send(channel, ...args)
  },
}

contextBridge.exposeInMainWorld('ipcRenderer', exposedIpcRenderer)
