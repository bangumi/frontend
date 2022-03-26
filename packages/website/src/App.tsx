import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Subject from './pages/Subject'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/subject/*" element={<Subject />} />
        <Route path="/" element={<HomePage />} />
        {/* TODO: 404 页 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
