import { Sprout, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Landing() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-10 sm:py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-100 text-brand-700">
            <Sprout className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">{t('hero.title')}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
          <div className="mt-6">
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg">
              {t('cta.getStarted')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-4">
            <h3 className="font-semibold dark:text-gray-100">Soil-aware</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Mock soil pH, moisture, and nutrients drive suggestions.</p>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold dark:text-gray-100">Local weather</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Placeholder forecast helps plan sowing and irrigation.</p>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold dark:text-gray-100">Market-aware</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Simulated demand & prices inform profitability.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
