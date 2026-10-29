import { useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const hasPreference = useRef(false)

  useEffect(() => {
    try {
      hasPreference.current = localStorage.getItem('forma-theme') !== null
    } catch {
      // The switch also works when browser storage is unavailable.
    }
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystem = (event: MediaQueryListEvent) => {
      if (!hasPreference.current) setTheme(event.matches ? 'dark' : 'light')
    }
    system.addEventListener('change', followSystem)
    return () => system.removeEventListener('change', followSystem)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0e1422' : '#f7f8fd')
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    hasPreference.current = true
    setTheme(next)
    try {
      localStorage.setItem('forma-theme', next)
    } catch {
      // Keep the selected theme for this session if storage is blocked.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle icon-button"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  )
}
