import React, { FC, Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import pageRoutes from '~react-pages'
import { isNoLayoutRoute } from './utils/route'
import { UserProvider } from './hooks/use-user'
import GlobalLayout from './components/GlobalLayout'

const App: FC = () => {
  const location = useLocation()
  return (
    <UserProvider>
      <Suspense fallback={null}>
        {
          isNoLayoutRoute(location.pathname)
            ? useRoutes(pageRoutes)
            : <GlobalLayout>{useRoutes(pageRoutes)}</GlobalLayout>
        }
      </Suspense>
    </UserProvider>
  )
}

export default App
