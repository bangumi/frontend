import React from 'react'
import { useParams } from 'react-router-dom'
import DetailEditor from './components/WikiEditor/DetailEditor'

const WikiEditPage: React.FC = () => {
  const { id } = useParams()
  return (
    <div>
      <span>维基编辑页: {id}</span>
      <DetailEditor />
    </div>
  )
}

export default WikiEditPage
