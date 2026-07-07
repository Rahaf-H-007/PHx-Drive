import { Tray, Menu, nativeImage, app } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

let tray = null
let _currentState = 'idle'
let _onShow = () => {}
let _onSettings = () => {}

const STATES = {
  idle: { label: 'Up to date', tooltip: 'PHx Drive. Up to date' },
  syncing: { label: 'Syncing…', tooltip: 'PHx Drive. Syncing…' },
  error: { label: 'Sync error', tooltip: 'PHx Drive. Sync error' }
}

// resolves a resource icon path for both dev and production
function resolveIconPath(name) {
  return is.dev ? join(app.getAppPath(), 'resources', name) : join(process.resourcesPath, name)
}

function loadIcon(filename) {
  const img = nativeImage.createFromPath(resolveIconPath(filename))
  if (img.isEmpty()) return nativeImage.createEmpty()
  if (process.platform === 'darwin') img.setTemplateImage(true)
  return img
}

const ICONS = {
  idle: () => loadIcon('icon_16x16.png'),
  syncing: () => loadIcon('tray-syncing.png'),
  error: () => loadIcon('tray-error.png')
}

//menu
function buildMenu(state) {
  const meta = STATES[state] ?? STATES.idle

  return Menu.buildFromTemplate([
    {
      label: `Status: ${meta.label}`,
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Show',
      click: _onShow
    },
    {
      label: 'Settings',
      click: _onSettings
    },
    { type: 'separator' },
    {
      label: 'Quit PHx Drive',
      click: () => app.quit()
    }
  ])
}

//this shows the window again when clicking "show"
function restoreWindow(win) {
  if (!win || win.isDestroyed()) return
  if (win.isMinimized()) win.restore()
  win.show()
  win.focus()
}

export function createTray(mainWindow, { onShowSettings } = {}) {
  if (tray && !tray.isDestroyed()) return tray

  tray = new Tray(ICONS.idle())
  tray.setToolTip(STATES.idle.tooltip)

  _onShow = () => restoreWindow(mainWindow)
  _onSettings = () => {
    restoreWindow(mainWindow)
    onShowSettings?.()
  }

  tray.setContextMenu(buildMenu('idle'))

  if (process.platform !== 'darwin') {
    tray.on('click', _onShow)
  }
  tray.on('double-click', _onShow)

  return tray
}

export function setTrayState(state) {
  if (!tray || tray.isDestroyed()) return
  if (state === _currentState) return // skip redundant redraws

  _currentState = state
  tray.setImage(ICONS[state]?.() ?? nativeImage.createEmpty())
  tray.setToolTip(STATES[state]?.tooltip ?? 'PHx Drive')
  tray.setContextMenu(buildMenu(state))
}

export function destroyTray() {
  if (tray && !tray.isDestroyed()) tray.destroy()
  tray = null
  _currentState = 'idle'
}
