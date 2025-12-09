import themeTransition from './themeTransition';

/**
 * Theme Manager with Smooth Transitions
 * Handles loading and switching between different color themes
 */
class ThemeManager {
  constructor() {
    this.currentTheme = null;
    this.loadedThemes = new Set();
  }

  /**
   * Load a theme CSS file dynamically
   * @param {string} themeName - Name of the theme to load
   * @returns {Promise<void>}
   */
  async loadThemeCSS(themeName) {
    // Check if already loaded
    if (this.loadedThemes.has(themeName)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // Remove old theme link if exists
      const oldLink = document.querySelector(`link[data-theme]`);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/src/themes/${themeName}.css`;
      link.setAttribute('data-theme', themeName);
      
      link.onload = () => {
        this.loadedThemes.add(themeName);
        this.currentTheme = themeName;
        
        // Remove old theme after new one loads
        if (oldLink && oldLink !== link) {
          setTimeout(() => oldLink.remove(), 100);
        }
        
        resolve();
      };
      
      link.onerror = () => {
        console.error(`Failed to load theme: ${themeName}`);
        reject(new Error(`Theme ${themeName} not found`));
      };
      
      document.head.appendChild(link);
    });
  }

  /**
   * Switch to a new theme with smooth transition
   * @param {string} themeName - Name of the theme to switch to
   * @returns {Promise<void>}
   */
  async switchTheme(themeName) {
    if (this.currentTheme === themeName) {
      return; // Already on this theme
    }

    await themeTransition.changeTheme(themeName, async () => {
      await this.loadThemeCSS(themeName);
      
      // Update body class for theme-specific styles
      document.body.className = document.body.className
        .replace(/theme-\w+/g, '')
        .trim();
      
      if (themeName !== 'brownie') { // brownie is default
        document.body.classList.add(`theme-${themeName}`);
      }
      
      // Save preference
      localStorage.setItem('colorTheme', themeName);
    });
  }

  /**
   * Get current theme name
   * @returns {string}
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Initialize theme from config
   * @param {string} themeName - Theme name from config
   * @returns {Promise<void>}
   */
  async initialize(themeName = 'brownie') {
    // Check for saved preference
    const savedTheme = localStorage.getItem('colorTheme') || themeName;
    
    try {
      await this.loadThemeCSS(savedTheme);
      
      // Apply theme class to body
      if (savedTheme !== 'brownie') {
        document.body.classList.add(`theme-${savedTheme}`);
      }
    } catch (error) {
      console.warn(`Falling back to default theme`);
      await this.loadThemeCSS('brownie');
    }
  }
}

// Export singleton instance
const themeManager = new ThemeManager();
export default themeManager;

// Also export the class for custom instances
export { ThemeManager };