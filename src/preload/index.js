import { contextBridge, ipcRenderer } from 'electron'

// renderer apis
const api = {
  login: (email, password) =>
    ipcRenderer.invoke('login', {
      email,
      password
    }),
  getSession: () => ipcRenderer.invoke('get-session'),
  logout: () => ipcRenderer.invoke('logout'),
  getHomeId: () => ipcRenderer.invoke('get-home-id')
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
