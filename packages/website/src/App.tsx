import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import PageRoutes from './components/PageRoutes'
import { UserProvider } from './hooks/use-user'
import Home from './pages/Home'
import Subject from './pages/Subject'

const App: FC = () => {
  return (
    <UserProvider>
      <GlobalLayout>
        <BrowserRouter>
          <PageRoutes>
            <Route path="subject/*" element={<Subject />} />
            <Route index element={<Home />} />
          </PageRoutes>
        </BrowserRouter>
      </GlobalLayout>
    </UserProvider>
  )
}

export default App
