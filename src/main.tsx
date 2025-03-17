import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});