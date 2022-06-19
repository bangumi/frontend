import { render } from '@testing-library/react'
import React from 'react'
import UserHome from './UserHome'
import { useUser } from '../../hooks/use-user'

jest.mock('../../hooks/use-user')

const mockedUseUser = jest.mocked(useUser)

it('should show user name if user is logged', () => {
  mockedUseUser.mockReturnValue({
    // 没必要写全
    // @ts-expect-error
    user: {
      nickname: 'testuser',
      url: 'https://bgm.tv/user/testuser-123'
    }
  })

  const { getByText } = render(<UserHome />)

  expect(getByText('testuser')).toHaveAttribute('href', 'https://bgm.tv/user/testuser-123')
})
