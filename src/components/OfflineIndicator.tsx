import { WifiOff } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OfflineIndicator() {
  const [offline, setOffline] = useState(!navigator.onLine)
  useEffect(() => {
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  if (!offline) return null
  return (
    <div title="Offline" className="inline-flex items-center gap-1 text-amber-700 bg-amber-100 border border-amber-200 px-2 py-1 rounded-md text-xs">
      <WifiOff className="h-4 w-4" />
      <span>Offline</span>
    </div>
  )
}
