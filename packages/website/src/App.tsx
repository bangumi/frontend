import React, { FC, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import pageRoutes from '~react-pages'
import { UserProvider } from './hooks/use-user'

const App: FC = () => {
  return (
    <UserProvider>
      <GlobalLayout>
        <Suspense fallback={<p>loading...</p>}>
          {useRoutes(pageRoutes)}
        </Suspense>
      </GlobalLayout>
    </UserProvider>
  )
}

export default App
