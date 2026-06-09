import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLanguage, type Language } from '../hooks/useLanguage';

interface LangContextType {
  locale: Language;
  setLocale: (l: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType>({ locale: 'en', setLocale: () => {}, dir: 'ltr', t: (k) => k, isRTL: false });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLanguage();
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
