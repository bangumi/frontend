import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DetailEditor from './WikiEditor/DetailEdtor'

const Subject: React.FC = () => {
  return (
    <Routes>
      <Route path="/:subjectId/edit-detail" element={<DetailEditor />} />
    </Routes>
  )
}

export default Subject
