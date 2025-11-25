import React, { createContext, useContext, useState, useEffect } from 'react';

import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import pt from '../locales/pt.json';

const LocaleContext = createContext();

const translations = {
  en,
  es,
  fr,
  de,
  pt
};

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    // Intentar cargar desde localStorage
    const saved = localStorage.getItem('locale');
    if (saved && translations[saved]) {
      return saved;
    }

    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
    // Actualizar atributo lang del HTML para accesibilidad
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
