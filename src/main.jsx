import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './components/GlobalContext';
import App from './components/App';
import './index.css';

// Standard React 18 bootstrap. Everything interesting happens in <App/>, which
// is wrapped in <GlobalProvider/> so any screen can reach the Escapp client,
// the app settings and the helper modules through React context.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
