import React from 'react';
import { Languages } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';
import { cn } from '@/lib/utils';

const availableLocales = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'pt', flag: '🇵🇹', name: 'Português' }
];

function LanguageSelector({ className }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Languages className="absolute left-2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className={cn(
          "appearance-none h-9 pl-8 pr-8 py-0 text-sm",
          "bg-transparent border border-input rounded-md",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "cursor-pointer transition-colors",
          "text-foreground"
        )}
        aria-label={t('header.selectLanguage')}
      >
        {availableLocales.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-2 h-4 w-4 text-muted-foreground pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}

export default LanguageSelector;
