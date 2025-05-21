import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { Provider } from 'react-redux';

// Check if sessionStorage already has reload info
const alreadyReloaded = sessionStorage.getItem('alreadyReloaded');

if (!alreadyReloaded) {
  // First time: mark and reload after 1 second
  sessionStorage.setItem('alreadyReloaded', 'true');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
} else {
  // Second time: remove flag and render app
  sessionStorage.removeItem('alreadyReloaded');

  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    
    <StrictMode>
      <App />
    </StrictMode>
  );
}
