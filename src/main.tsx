import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProviders from '../app/providers/AppProviders';
import AppRouter from '../app/router';
import '../app/styles/globals.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('SW registration failed:', error);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </React.StrictMode>
);