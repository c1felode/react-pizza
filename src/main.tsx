import { BrowserRouter } from 'react-router-dom';

import { Analytics } from '@vercel/analytics/react';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import App from './App.tsx';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Analytics />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
