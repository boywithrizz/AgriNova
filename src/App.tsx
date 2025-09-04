import { Routes, Route, NavLink } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { WifiOff, Sprout } from 'lucide-react'
import OfflineIndicator from './components/OfflineIndicator'
import ThemeToggle from './components/ThemeToggle'
import LanguagePicker from './components/LanguagePicker'
import { useState } from 'react'
import { IN_LANGUAGES, languageDisplay } from './data/languages'

function Header() {
  const { t, lang, setLang } = useLanguage()
  const [pickerOpen, setPickerOpen] = useState(false)
  const selectValue = (lang === 'en' || lang === 'hi') ? lang : 'local'
  const currentLocal = (lang !== 'en' && lang !== 'hi') ? languageDisplay(lang as any) : null
  return (
  <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
    <NavLink to="/" className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-bold">
          <Sprout className="h-6 w-6" />
          <span>AgriNova</span>
        </NavLink>
    <div className="flex items-center gap-3">
          {/* Language switcher */}
          <select
            aria-label={t('language')}
            value={selectValue}
            onChange={(e) => {
              const val = e.target.value
              if (val === 'local') {
                // Open picker modal to choose among Indian languages
                setPickerOpen(true)
              } else {
                setLang(val as any)
              }
            }}
      className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="local">स्थानीय</option>
          </select>
          {currentLocal && (
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" title="Selected local language">
              {currentLocal}
            </span>
          )}

          <OfflineIndicator />
      <ThemeToggle />

          <nav className="hidden sm:flex items-center gap-4">
            <NavLink to="/" className={({isActive})=>`text-sm ${isActive?'text-brand-700 dark:text-brand-400 font-semibold':'text-gray-600 dark:text-gray-300'}`}>{t('nav.home')}</NavLink>
            <NavLink to="/dashboard" className={({isActive})=>`text-sm ${isActive?'text-brand-700 dark:text-brand-400 font-semibold':'text-gray-600 dark:text-gray-300'}`}>{t('nav.dashboard')}</NavLink>
            <NavLink to="/contact" className={({isActive})=>`text-sm ${isActive?'text-brand-700 dark:text-brand-400 font-semibold':'text-gray-600 dark:text-gray-300'}`}>{t('nav.contact')}</NavLink>
          </nav>
        </div>
      </div>
      <LanguagePicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} AI Crop Advisor • Prototype
      </div>
    </footer>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
