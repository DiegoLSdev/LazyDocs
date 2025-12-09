import { useState, useEffect } from 'react';
import themeTransition from '../utils/themeTransition';

/**
 * Enhanced Dark Mode Hook with Smooth Transitions
 * Automatically handles smooth theme switching without jarring visual changes
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = async (e) => {
      // Only auto-switch if user hasn't manually set preference
      const hasManualPreference = localStorage.getItem('darkMode') !== null;
      if (!hasManualPreference) {
        await themeTransition.transition(() => {
          setIsDark(e.matches);
        });
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggle = async () => {
    await themeTransition.toggleDarkMode(isDark, () => {
      setIsDark(prev => !prev);
    });
  };

  return { isDark, toggle };
}