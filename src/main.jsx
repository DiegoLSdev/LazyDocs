import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

async function loadTheme() {
  try {
    const response = await fetch('/config.json');
    const config = await response.json();
    const theme = config.colorTheme || 'brownie';
    
    // Importar el tema correspondiente
    await import(`./themes/${theme}.css`);
  } catch (error) {
    console.error('Error loading theme:', error);
    // Fallback al tema brownie
    await import('./themes/brownie.css');
  }
}

// Cargar tema antes de renderizar la app
loadTheme().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
