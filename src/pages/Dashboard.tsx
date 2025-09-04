import Card from '../components/Card'
import DataStat from '../components/DataStat'
import QueryBar from '../components/QueryBar'
import { CloudSun, Droplets, Leaf, LineChart, Sprout, Wheat } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import soil from '../data/soil.json'
import weather from '../data/weather.json'
import rotation from '../data/rotation.json'
import market from '../data/market.json'
import recos from '../data/recommendations.json'
import { LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="sr-only">{t('dashboard.title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card title={t('cards.soil')} icon={<Leaf className="h-5 w-5 text-brand-600" />}> 
          <DataStat label="pH" value={soil.ph} />
          <DataStat label="Moisture" value={soil.moisture} unit="%" />
          <DataStat label="N" value={soil.n} unit="mg/kg" />
          <DataStat label="P" value={soil.p} unit="mg/kg" />
          <DataStat label="K" value={soil.k} unit="mg/kg" />
        </Card>

        <Card title={t('cards.weather')} icon={<CloudSun className="h-5 w-5 text-brand-600" />}> 
          <div className="space-y-1">
            {weather.forecast.slice(0,4).map((w) => (
              <div key={w.day} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{w.day}</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{w.temp}°C • {w.condition}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('cards.rotation')} icon={<Wheat className="h-5 w-5 text-brand-600" />}> 
          <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
            {rotation.history.map((r) => (
              <li key={r.season}>{r.season}: {r.crop}</li>
            ))}
          </ul>
        </Card>

        <Card title={t('cards.market')} icon={<LineChart className="h-5 w-5 text-brand-600" />}> 
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={market.prices} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="wheat" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rice" stroke="#16a34a" strokeWidth={2} dot={false} />
              </RLineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card title={t('cards.recommendations')} icon={<Sprout className="h-5 w-5 text-brand-600" />}> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recos.recommendations.map((r) => (
        <div key={r.crop} className="border rounded-lg p-3 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">{r.crop}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-900 dark:bg-brand-200 dark:text-brand-900">{r.sustainability}/100</span>
                  </div>
                  <div className="mt-2 text-sm">
          <div className="flex items-center justify-between py-1"><span className="text-gray-600 dark:text-gray-400">Expected yield</span><strong className="dark:text-gray-100">{r.yield} q/acre</strong></div>
          <div className="flex items-center justify-between py-1"><span className="text-gray-600 dark:text-gray-400">Profit margin</span><strong className="dark:text-gray-100">{r.profit}%</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Actions" icon={<Droplets className="h-5 w-5 text-brand-600" />}> 
      <ul className="text-sm list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Next irrigation in 2 days.</li>
              <li>Apply micronutrients after 1 week.</li>
              <li>Check market before sowing.</li>
            </ul>
          </Card>
          <QueryBar />
        </div>
      </div>
    </div>
  )
}
