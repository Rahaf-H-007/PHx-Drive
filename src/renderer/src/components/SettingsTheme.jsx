import { useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import SettingsCard from './SettingsCard'
import { THEMES, applyTheme } from '../utils/theme'

export default function SettingsTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === THEMES.DARK
  )

  const toggle = () => {
    const next = isDark ? THEMES.LIGHT : THEMES.DARK
    applyTheme(next)
    setIsDark(!isDark)
  }

  return (
    <SettingsCard label="APPEARANCE">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-base-content/50">
            {isDark ? <MoonIcon className="size-4.5" /> : <SunIcon className="size-4.5" />}
          </span>
          <div>
            <p className="text-sm font-medium text-base-content">
              {isDark ? 'Dark mode' : 'Light mode'}
            </p>
            <p className="text-xs text-base-content/50">Choose your preferred appearance</p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle dark mode"
          onClick={toggle}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
            transition-colors duration-200 hover:cursor-pointer
            focus-visible:outline focus-visible:outline-offset-2
            focus-visible:outline-[#8B1A1A]
            ${isDark ? 'bg-[#8B1A1A]' : 'bg-base-300'}`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white shadow
              transition-transform duration-200
              ${isDark ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>
    </SettingsCard>
  )
}
