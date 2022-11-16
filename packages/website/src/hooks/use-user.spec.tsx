import React, { PropsWithChildren } from 'react'
import { useUser, UserProvider, LoginErrorCode, PasswordUnMatchError } from './use-user'
import { server as mockServer } from '../mocks/server'
import { rest } from 'msw'
import { waitFor, renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

function mockLogin(statusCode: number, response: Object = {}): void {
  mockServer.use(
    rest.post('http://localhost/p/login', (req, res, ctx) => {
      return res(ctx.status(statusCode), ctx.json(response))
    }),
  )
}

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <UserProvider>{children}</UserProvider>
  </MemoryRouter>
)

it.each`
  statusCode | resp                         | expectedError
  ${401}     | ${{ detail: { remain: 4 } }} | ${new PasswordUnMatchError(4)}
  ${400}     | ${{}}                        | ${new Error(LoginErrorCode.E_REQUEST_ERROR)}
  ${422}     | ${{}}                        | ${new Error(LoginErrorCode.E_CLIENT_ERROR)}
  ${418}     | ${{}}                        | ${new Error(LoginErrorCode.E_UNKNOWN_ERROR)}
  ${502}     | ${{}}                        | ${new Error(LoginErrorCode.E_SERVER_ERROR)}
`(
  'should return error if request is failed with failed status $statusCode',
  async ({ statusCode, resp, expectedError }) => {
    const { result } = renderHook(() => useUser(), { wrapper })

    mockLogin(statusCode, resp)

    expect.assertions(1)
    await expect(result.current.login('fakeuser', 'fakepassword', 'fake-token')).rejects.toEqual(
      expectedError,
    )

    await waitFor(() => {})
  },
)

it('should refresh me if login succeeded', async () => {
  const { result } = renderHook(() => useUser(), { wrapper })

  mockLogin(200)
  await result.current.login('fakeuser', 'fakepassword', 'fake-token')
  await waitFor(() => {
    expect(result.current.user).toMatchSnapshot()
  })
})
