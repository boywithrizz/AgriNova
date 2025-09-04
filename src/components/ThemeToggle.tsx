import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const btn = 'inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs bg-white/80 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 border-gray-300'
  return (
    <div className="flex items-center gap-1" aria-label="Theme Switcher">
      <button className={btn + (theme==='light'?' ring-1 ring-brand-500':'')} onClick={()=>setTheme('light')} title="Light">
        <Sun className="h-4 w-4" />
      </button>
      <button className={btn + (theme==='dark'?' ring-1 ring-brand-500':'')} onClick={()=>setTheme('dark')} title="Dark">
        <Moon className="h-4 w-4" />
      </button>
      <button className={btn + (theme==='system'?' ring-1 ring-brand-500':'')} onClick={()=>setTheme('system')} title="System">
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  )
}
