import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import themeManager from './utils/themeManager';

async function loadConfig() {
  try {
    const response = await fetch('/config.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    return { colorTheme: 'brownie' };
  }
}

async function initializeApp() {
  // Load config
  const config = await loadConfig();
  
  // Initialize theme with smooth loading
  await themeManager.initialize(config.colorTheme);
  
  // Render app
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Initialize app
initializeApp();