import React from 'react'
import { Routes, Route } from 'react-router-dom'

const PageRoutes: React.FC = (props) => {
  return (
    <Routes>
      {props.children}
      {/* TODO: 404 页 */}
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default PageRoutes
