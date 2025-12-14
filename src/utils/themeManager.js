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
   * Load a theme CSS file dynamically using Vite's dynamic import
   * @param {string} themeName - Name of the theme to load
   * @returns {Promise<void>}
   */
  async loadThemeCSS(themeName) {
    // Check if already loaded
    if (this.loadedThemes.has(themeName)) {
      this.currentTheme = themeName;
      return Promise.resolve();
    }

    try {
      // Use Vite's dynamic import for CSS - this ensures PostCSS/Tailwind processes the file
      await import(`../themes/${themeName}.css`);
      this.loadedThemes.add(themeName);
      this.currentTheme = themeName;
    } catch (error) {
      console.error(`Failed to load theme: ${themeName}`, error);
      throw new Error(`Theme ${themeName} not found`);
    }
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