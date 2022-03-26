import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalLayout } from './components/GlobalLayout'
import Home from './pages/Home'
import Subject from './pages/Subject'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="subject/*" element={<Subject />} />
          <Route index element={<Home />} />
          {/* TODO: 404 页 */}
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
