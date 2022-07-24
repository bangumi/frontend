import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

import 'normalize.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
)
