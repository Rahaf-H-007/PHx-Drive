import { getRecentActivity, getSyncStatus } from './db/activityLog'

export function registerActivityLogHandlers(ipcMain) {
  ipcMain.handle('activity:get-recent', () => getRecentActivity())
  ipcMain.handle('activity:get-status', () => getSyncStatus())
}
