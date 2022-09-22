import React, { FC, Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import pageRoutes from '~react-pages'
import { UserProvider } from './hooks/use-user'
import GlobalLayout from './components/GlobalLayout'

const noLayoutPaths = new Set([
  '/login'
])

const App: FC = () => {
  const location = useLocation()
  return (
    <UserProvider>
      <Suspense fallback={null}>
        {
          noLayoutPaths.has(location.pathname)
            ? useRoutes(pageRoutes)
            : <GlobalLayout>{useRoutes(pageRoutes)}</GlobalLayout>
        }
      </Suspense>
    </UserProvider>
  )
}

export default App
