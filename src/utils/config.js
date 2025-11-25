export async function loadConfig() {
  try {
    const response = await fetch('/config.json');
    if (!response.ok) {
      throw new Error('Failed to load config.json');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    // Return default config
    return {
      siteName: 'LazyDocs',
      tagline: 'Create beautiful documentation with ease',
      logo: {
        light: '/logo.png',
        dark: '/logo-dark.png'
      },
      title: {
        light: '/title.png',
        dark: '/title-dark.png'
      },
      theme: {},
      navbar: { links: [] },
      footer: { copyright: '© 2025 LazyDocs', links: [] },
      docsPath: 'docs'
    };
  }
}

// Helper function to get the correct image based on theme
export function getThemedImage(imageConfig, isDark) {
  // Si es un string, retornarlo directamente (retrocompatibilidad)
  if (typeof imageConfig === 'string') {
    return imageConfig;
  }
  
  // Si es un objeto con light/dark, retornar según el tema
  if (imageConfig && typeof imageConfig === 'object') {
    return isDark ? imageConfig.dark : imageConfig.light;
  }
  
  return null;
}
