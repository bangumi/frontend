import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useUser, UserProvider, LoginErrorCode } from './use-user'
import { server as mockServer } from '../mocks/server'
import { rest } from 'msw'
import { waitFor } from '@testing-library/react'

function mockLogin (statusCode: number): void {
  mockServer.use(
    rest.post('http://localhost/p/login', (req, res, ctx) => {
      return res(ctx.status(statusCode))
    })
  )
}

const wrapper: React.FC = ({ children }) => <UserProvider>{children}</UserProvider>

it.each`
  statusCode | expectedError
  ${401} | ${new Error(LoginErrorCode.E_USERNAME_OR_PASSWORD_INCORRECT)}
  ${400} | ${new Error(LoginErrorCode.E_REQUEST_ERROR)}
  ${422} | ${new Error(LoginErrorCode.E_CLIENT_ERROR)}
  ${418} | ${new Error(LoginErrorCode.E_UNKNOWN_ERROR)}
  ${502} | ${new Error(LoginErrorCode.E_SERVER_ERROR)}
`('should return error if request is failed with failed status $statusCode', async ({ statusCode, expectedError }) => {
  const { result } = renderHook(() => useUser(), { wrapper })

  mockLogin(statusCode)

  expect.assertions(1)
  await expect(result.current.login('fakeuser', 'fakepassword', 'fake-token')).rejects.toEqual(
    expectedError
  )
})

it('should refresh me if login succeeded', async () => {
  const { result } = renderHook(() => useUser(), { wrapper })

  mockLogin(200)
  await result.current.login('fakeuser', 'fakepassword', 'fake-token')
  await waitFor(() => {
    expect(result.current.user).toMatchSnapshot()
  })
})
