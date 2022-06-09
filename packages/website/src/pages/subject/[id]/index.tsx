import React from 'react'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'

const SubjectPage: React.FC = () => {
  const { id } = useParams()
  return <GlobalLayout>条目ID: {id}</GlobalLayout>
}

export default SubjectPage
