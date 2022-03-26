import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { GlobalLayout } from './components/GlobalLayout'
import PageRoutes from './components/PageRoutes'
import Home from './pages/Home'
import Subject from './pages/Subject'

const App: FC = () => {
  return (
    <BrowserRouter>
      <PageRoutes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="subject/*" element={<Subject />} />
          <Route index element={<Home />} />
        </Route>
      </PageRoutes>
    </BrowserRouter>
  )
}

export default App
