import { contextBridge, ipcRenderer } from 'electron'

// renderer apis
const api = {
  login: (email, password) =>
    ipcRenderer.invoke('login', {
      email,
      password
    }),
  getUsers: () => ipcRenderer.invoke('get-users')
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
