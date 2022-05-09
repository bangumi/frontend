import React, { FC, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import pageRoutes from '~react-pages'

const App: FC = () => {
  return (
    <GlobalLayout>
      <Suspense fallback={<p>loading...</p>}>
        {useRoutes(pageRoutes)}
      </Suspense>
    </GlobalLayout>
  )
}

export default App
