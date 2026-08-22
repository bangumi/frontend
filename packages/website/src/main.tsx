import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';

import App from './App.tsx';
import SuspenseRouter from './components/SuspenseRouter.tsx';

const root = createRoot(document.getElementById('root')!);
root.render(
  // <React.StrictMode>
  <SWRConfig
    value={{
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }}
  >
    <SuspenseRouter>
      <App />
    </SuspenseRouter>
  </SWRConfig>,
  // </React.StrictMode>,
);
