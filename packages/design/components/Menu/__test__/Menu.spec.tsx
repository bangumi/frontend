import { render } from '@testing-library/react'
import React from 'react'
import Menu, { MenuItem } from '..'

const items = [{
  key: '1',
  label: '1'
}, {
  key: '2',
  label: '2'
}]

it('should render all menu', () => {
  const { getByText, container } = render(
    <Menu items={items} />
  )
  expect(container.firstChild).toHaveClass('bgm-menu', 'bgm-menu--horizontal')
  expect(getByText('1')).toBeInTheDocument()
  expect(getByText('2')).toBeInTheDocument()
  expect(getByText('1')).toHaveClass('bgm-menu-item')
})

it('should trigger onChange when click menus', () => {
  const handleChange = jest.fn()
  const { getByText } = render(
    <Menu onClick={handleChange} items={items} />
  )
  getByText('2').click()
  expect(handleChange.mock.calls[0].length).toBe(2)
  expect(handleChange.mock.calls[0][0]).toBe('2')
})

it('should trigger custom trigger instead of default trigger', () => {
  const handleChange = jest.fn()
  const handleChangeSingle = jest.fn()
  const { getByText } = render(
    <Menu onClick={handleChange} items={items}>
      {
        items => (
          <>
            {
              items!.map(item =>
                <MenuItem key={item.key} id={item.key} onClick={item.key === '1' ? handleChangeSingle : undefined}>
                  {item.label}
                </MenuItem>
              )
            }
          </>
        )
      }
    </Menu>
  )
  getByText('1').click()
  expect(handleChange.mock.calls.length).toBe(0)
  expect(handleChangeSingle.mock.calls.length).toBe(1)
})

it('Render Props', () => {
  const Comp: React.FC<{ label: string }> = ({ label }) => <div>{`Custom:${label}`}</div>
  const { getByText } = render(
    <Menu items={items}>
      {
        items => (
          <>
            {
              items!.map(item =>
                <Comp label={item.label} key={item.key} />
              )
            }
          </>
        )
      }
    </Menu>
  )
  expect(getByText('Custom:1')).toBeInTheDocument()
})
