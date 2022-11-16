import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import pageRoutes from '~react-pages'
import { UserProvider } from './hooks/use-user'

const App = () => {
  return (
    <UserProvider>
      <Suspense fallback={null}>{useRoutes(pageRoutes)}</Suspense>
    </UserProvider>
  )
}

export default App
