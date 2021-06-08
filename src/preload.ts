import { contextBridge, IpcRenderer, ipcRenderer } from 'electron'

// for graphql-transport-electron
interface GraphqlIpcRenderer {
  on: IpcRenderer['on']
  removeListener: IpcRenderer['removeListener']
  send: IpcRenderer['send']
}
const graphqlChannel = 'graphql'
const graphqlIpc: GraphqlIpcRenderer = {
  on(_channel, listener) {
    return ipcRenderer.on(graphqlChannel, listener)
  },
  removeListener(_channel, listener) {
    return ipcRenderer.removeListener(graphqlChannel, listener)
  },
  send(_channel, ...args) {
    return ipcRenderer.send(graphqlChannel, ...args)
  },
}

contextBridge.exposeInMainWorld('graphqlIpc', graphqlIpc)
