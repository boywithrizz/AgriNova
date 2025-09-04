import { ReactNode } from 'react'

export default function Card({ title, icon, children, className = '' }: { title?: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`card p-4 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon}
          {title && <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{title}</h3>}
        </div>
      )}
      {children}
    </section>
  )
}
