// @ts-nocheck
import React from 'react'
import { render } from '@testing-library/react'
import { RequireAuth } from './auth'
import { UserGroup } from '@bangumi/types/user'
import { useUser } from '../../hooks/use-user'
import { useNavigate } from 'react-router-dom'

jest.mock('../../hooks/use-user')
const mockedUseUser = jest.mocked(useUser)

jest.mock('react-router-dom')
const mockedUseNavigate = jest.mocked(useNavigate)

afterEach(() => {
  jest.resetAllMocks()
})

const ComponentRequireAuth: React.FC = () => {
  return (
    <RequireAuth
      groupRequired={[UserGroup.Admin]}
      redirectUrlWhenUnauthorized="/"
    >
      只有管理员知道的世界
    </RequireAuth>
  )
}

describe('RequireAuth', () => {
  it('should show content if user is authorized properly', () => {
    mockedUseUser.mockReturnValue({
      user: {
        user_group: UserGroup.Admin
      }
    })
    const { getByText } = render(<ComponentRequireAuth />)

    expect(getByText('只有管理员知道的世界')).toBeInTheDocument()
  })

  it("should redirect to designated page if user isn't authorized", () => {
    const mockedNavigate = jest.fn()
    mockedUseNavigate.mockReturnValue(mockedNavigate)
    mockedUseUser.mockReturnValue({
      user: {
        user_group: UserGroup.User
      }
    }
    )

    render(<ComponentRequireAuth />)
    expect(mockedNavigate).toBeCalledWith('/', { replace: true })
  })

  it('should redirect to login page if user is logged', () => {
    const mockedRedirectToLogin = jest.fn()
    mockedUseUser.mockReturnValue({
      user: null,
      redirectToLogin: mockedRedirectToLogin
    })

    render(<ComponentRequireAuth />)
    expect(mockedRedirectToLogin).toBeCalled()
  })
})
