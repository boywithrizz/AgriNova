import { X } from 'lucide-react'
import { IN_LANGUAGES, languageDisplay, LangCode } from '../data/languages'
import { useLanguage } from '../context/LanguageContext'
import { useEffect } from 'react'

export default function LanguagePicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setLang } = useLanguage()

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full sm:max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 p-4 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-gray-100">Choose your language</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {IN_LANGUAGES.map(({ code, name, native }) => (
            <button
              key={code}
              onClick={() => { setLang(code as LangCode); onClose() }}
              className="text-left border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="font-medium dark:text-gray-100">{name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{native}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
