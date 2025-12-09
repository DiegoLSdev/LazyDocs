/**
 * Progressive Theme Transition Utility
 * Handles smooth theme changes with customizable transition duration and easing
 */

export class ThemeTransition {
  constructor(options = {}) {
    this.duration = options.duration || 400; // ms
    this.easing = options.easing || 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    this.isTransitioning = false;
  }

  /**
   * Apply transition styles to prevent jarring theme changes
   */
  applyTransitionStyles() {
    const style = document.createElement('style');
    style.id = 'theme-transition-styles';
    style.textContent = `
      * {
        transition: 
          background-color ${this.duration}ms ${this.easing},
          color ${this.duration}ms ${this.easing},
          border-color ${this.duration}ms ${this.easing},
          box-shadow ${this.duration}ms ${this.easing},
          fill ${this.duration}ms ${this.easing},
          stroke ${this.duration}ms ${this.easing} !important;
      }
      
      /* Prevent transition on specific elements if needed */
      .no-theme-transition,
      .no-theme-transition * {
        transition: none !important;
      }
    `;
    
    document.head.appendChild(style);
  }

  /**
   * Remove transition styles after theme change completes
   */
  removeTransitionStyles() {
    const style = document.getElementById('theme-transition-styles');
    if (style) {
      style.remove();
    }
  }

  /**
   * Execute theme change with smooth transition
   * @param {Function} themeChangeFn - Function that applies the theme change
   */
  async transition(themeChangeFn) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Apply transition styles
    this.applyTransitionStyles();
    
    // Small delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Execute theme change
    themeChangeFn();
    
    // Wait for transition to complete
    await new Promise(resolve => setTimeout(resolve, this.duration));
    
    // Remove transition styles to prevent performance issues
    this.removeTransitionStyles();
    
    this.isTransitioning = false;
  }

  /**
   * Toggle dark mode with smooth transition
   * @param {boolean} isDark - Current dark mode state
   * @param {Function} toggleFn - Function to toggle dark mode
   */
  async toggleDarkMode(isDark, toggleFn) {
    await this.transition(() => {
      toggleFn();
    });
  }

  /**
   * Change theme with smooth transition
   * @param {string} newTheme - Theme name to load
   * @param {Function} loadThemeFn - Function that loads the theme CSS
   */
  async changeTheme(newTheme, loadThemeFn) {
    await this.transition(async () => {
      await loadThemeFn(newTheme);
    });
  }
}

/**
 * Default export - singleton instance
 */
const themeTransition = new ThemeTransition({
  duration: 400,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
});

export default themeTransition;