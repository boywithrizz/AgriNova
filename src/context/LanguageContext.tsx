import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { IN_LANGUAGES, LangCode } from '../data/languages'

type Lang = LangCode | 'local'

type Dict = Record<string, Partial<Record<'en' | 'hi' | 'local', string>>>

// Minimal base dictionary. For non-supported languages, we'll fallback to English.
const dict: Dict = {
  'nav.home': { en: 'Home', hi: 'होम', local: 'मुखपृष्ठ' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', local: 'डैशबोर्ड' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क', local: 'संपर्क' },
  language: { en: 'Language', hi: 'भाषा', local: 'भाषा' },
  'cta.getStarted': { en: 'Open Dashboard', hi: 'डैशबोर्ड खोलें', local: 'डैशबोर्ड खोलें' },
  'hero.title': { en: 'AI-Based Crop Recommendation', hi: 'एआई आधारित फ़सल सिफारिश', local: 'एआई फ़सल सलाह' },
  'hero.subtitle': { en: 'Personalized, local, and simple guidance for every farmer.', hi: 'हर किसान के लिए सरल और स्थानीय सलाह।', local: 'हर किसान हेतु स्थानीय सलाह।' },
  'dashboard.title': { en: 'Farmer Dashboard', hi: 'किसान डैशबोर्ड', local: 'किसान डैशबोर्ड' },
  'cards.soil': { en: 'Soil Snapshot', hi: 'मिट्टी का सार', local: 'मिट्टी सार' },
  'cards.weather': { en: 'Weather', hi: 'मौसम', local: 'मौसम' },
  'cards.recommendations': { en: 'AI Recommendations', hi: 'एआई सिफारिशें', local: 'एआई सलाह' },
  'cards.market': { en: 'Market Trends', hi: 'बाज़ार रुझान', local: 'बाज़ार रुझान' },
  'cards.rotation': { en: 'Past Crop Rotation', hi: 'फसल चक्र इतिहास', local: 'फसल चक्र' },
  'query.ask': { en: 'Ask a question…', hi: 'प्रश्न पूछें…', local: 'प्रश्न पूछें…' },
  'query.voice': { en: 'Voice', hi: 'आवाज़', local: 'आवाज़' },
  'query.image': { en: 'Image', hi: 'चित्र', local: 'चित्र' },
  'query.send': { en: 'Send', hi: 'भेजें', local: 'भेजें' },
  'contact.title': { en: 'Contact & Partnerships', hi: 'संपर्क व भागीदारी', local: 'संपर्क' },
  'contact.body': { en: 'For pilots with governments/NGOs, reach out via email.', hi: 'सरकार/एनजीओ के साथ पायलट हेतु, ईमेल करें।', local: 'सरकार/एनजीओ हेतु ईमेल करें।' },
}

function translate(key: string, lang: Lang) {
  const entry = dict[key]
  if (!entry) return key
  // Prefer exact match for 'en' | 'hi' | 'local' keys; others fallback to hi -> en
  if (lang === 'en' && entry.en) return entry.en
  if (lang === 'hi' && entry.hi) return entry.hi
  if (lang === 'local' && entry.local) return entry.local
  return entry.hi ?? entry.en ?? key
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang | null) ?? 'en')
  const [override, setOverride] = useState<Record<string, string> | null>(null)

  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])

  // Dynamically load locale JSON: src/locales/{code}.json
  useEffect(() => {
    const modules = import.meta.glob('../locales/*.json') as Record<string, () => Promise<{ default: Record<string, string> }>>
    const key = `../locales/${lang}.json`
    const loader = (modules as any)[key] as undefined | (() => Promise<{ default: Record<string, string> }>)
    if (loader) {
      loader().then((mod) => setOverride(mod.default)).catch(() => setOverride(null))
    } else {
      setOverride(null)
    }
  }, [lang])

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang,
    t: (key: string) => {
      if (override && override[key]) return override[key]
      return translate(key, lang)
    }
  }), [lang, override])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
