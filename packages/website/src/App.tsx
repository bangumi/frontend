import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import PageRoutes from './components/PageRoutes'
import Home from './pages/Home'
import Subject from './pages/Subject'

const App: FC = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <PageRoutes>
          <Route path="subject/*" element={<Subject />} />
          <Route index element={<Home />} />
        </PageRoutes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
