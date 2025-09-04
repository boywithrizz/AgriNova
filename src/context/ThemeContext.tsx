import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type Ctx = {
  theme: Theme
  setTheme: (t: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<Ctx | null>(null)

function getSystemDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const dark = theme === 'dark' || (theme === 'system' && getSystemDark())
  root.classList.toggle('dark', dark)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    return saved ?? 'system'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => theme === 'system' && applyTheme('system')
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [theme])

  const value = useMemo<Ctx>(() => ({
    theme,
    setTheme: (t) => setThemeState(t),
    isDark: document.documentElement.classList.contains('dark')
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
