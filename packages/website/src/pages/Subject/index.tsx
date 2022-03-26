import React from 'react'
import { Route } from 'react-router-dom'
import PageRoutes from '../../components/PageRoutes'
import DetailEditor from './WikiEditor/DetailEdtor'

const Subject: React.FC = () => {
  return (
    <PageRoutes>
      <Route path="/:subjectId/edit-detail" element={<DetailEditor />} />
    </PageRoutes>
  )
}

export default Subject
