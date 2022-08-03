import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../../components/GlobalLayout'

const Topic: FC = () => {
  const { id } = useParams()
  return (
    <GlobalLayout>
      <div>{id}</div>
    </GlobalLayout>
  )
}
export default Topic
