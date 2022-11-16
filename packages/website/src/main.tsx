import App from './App'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

import 'reset-css'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshWhenHidden: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
)
