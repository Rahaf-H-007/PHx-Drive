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
  getFiles: () => ipcRenderer.invoke('get-files'),
  selectSyncFolder: () => ipcRenderer.invoke('sync-folder:select'),
  saveSettings: (settings) => ipcRenderer.invoke('settings:save', settings),
  loadSettings: () => ipcRenderer.invoke('settings:load'),
  manualSync: () => ipcRenderer.invoke('sync:manual'),
  openGuide: () => ipcRenderer.invoke('links:open-guide'),
  openWebApp: () => ipcRenderer.invoke('links:open-web-app'),
  getRecentActivity: () => ipcRenderer.invoke('activity:get-recent'),
  getSyncStatus: () => ipcRenderer.invoke('activity:get-status'),
  onSyncUpdate: (cb) => ipcRenderer.on('sync:updated', cb),
  offSyncUpdate: (cb) => ipcRenderer.removeListener('sync:updated', cb)
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
