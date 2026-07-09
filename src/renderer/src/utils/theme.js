export const THEMES = { LIGHT: 'light', DARK: 'dark' }

/** Sync read — safe to call before React renders */
export function getStoredTheme() {
  return localStorage.getItem('theme') || THEMES.LIGHT
}

/** Mutates the DOM + saves. Pure CSS cascade handles the rest — no React re-renders. */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}
