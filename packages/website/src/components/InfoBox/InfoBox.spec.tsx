import React from 'react'
import { render } from '@testing-library/react'
import InfoBox from '.'

it('should list info entries in the box', () => {
  const info = [{
    key: '简体中文名',
    value: '真希波·玛丽·伊兰崔亚斯'
  }]
  const { getByText } = render(<InfoBox info={info} />)

  expect(getByText('简体中文名:')).toBeInTheDocument()
  expect(getByText('真希波·玛丽·伊兰崔亚斯')).toBeInTheDocument()
})

it('should list info entry with child entries in the box', () => {
  const info = [{
    key: '别名',
    value: [
      {
        k: '第二中文名',
        v: '真希波·真理·伊拉丝托莉雅斯'
      },
      {
        k: '英文名',
        v: 'Mari Makinami Illustrious'
      }
    ]
  }]

  const { getByText } = render(<InfoBox info={info} />)

  expect(getByText('别名:')).toBeInTheDocument()
  expect(getByText('真希波·真理·伊拉丝托莉雅斯')).toBeInTheDocument()
  expect(getByText('Mari Makinami Illustrious')).toBeInTheDocument()
})
