import { Mail, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="text-2xl font-bold mt-6 dark:text-gray-100">{t('contact.title')}</h1>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{t('contact.body')}</p>
      <div className="card p-4 mt-4">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100"><Mail className="h-5 w-5 text-brand-600" /> support@ai-crop-advisor.example</div>
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 mt-2"><Phone className="h-5 w-5 text-brand-600" /> +91 00000 00000</div>
      </div>
    </div>
  )
}
