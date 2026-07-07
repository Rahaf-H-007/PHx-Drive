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
  offSyncUpdate: (cb) => ipcRenderer.removeListener('sync:updated', cb),
  getStorageQuota: () => ipcRenderer.invoke('storage:get-quota'),
  onQuotaExceeded: (cb) => ipcRenderer.on('sync:quota-exceeded', cb),
  offQuotaExceeded: (cb) => ipcRenderer.removeListener('sync:quota-exceeded', cb),
  onSyncStatus: (cb) => {
    const listener = (_, payload) => cb(payload)
    ipcRenderer.on('sync:status', listener)
    return () => ipcRenderer.removeListener('sync:status', listener)
  },
  onFileStateUpdate: (cb) => {
    const listener = (_, payload) => cb(payload)
    ipcRenderer.on('sync:file-state', listener)
    return () => ipcRenderer.removeListener('sync:file-state', listener)
  },
  onNavigate: (cb) => {
    const listener = (_, path) => cb(path)
    ipcRenderer.on('app:navigate', listener)
    return () => ipcRenderer.removeListener('app:navigate', listener)
  }
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
