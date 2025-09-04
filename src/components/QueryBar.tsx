import { Image, Mic, Send, Type } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function QueryBar() {
  const { t } = useLanguage()
  const [q, setQ] = useState('')
  return (
    <div className="card p-3 sticky bottom-3">
      <div className="flex gap-2 items-center">
        <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300" title={t('query.voice')} aria-label={t('query.voice')}>
          <Mic className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300" title={t('query.image')} aria-label={t('query.image')}>
          <Image className="h-5 w-5" />
        </button>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
          placeholder={t('query.ask')}
        />
        <button className="inline-flex items-center gap-1 bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 rounded-lg" title={t('query.send')} aria-label={t('query.send')}>
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">{t('query.send')}</span>
        </button>
      </div>
    </div>
  )
}
