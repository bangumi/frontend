import React from 'react'
import GroupHome from '..'
import { RenderResult, waitFor } from '@testing-library/react'
import { renderPage } from '../../../../utils/test-utils'
import { server as mockServer } from '../../../../mocks/server'
import { rest } from 'msw'
import Boring from './boring.json'
import { useParams } from 'react-router-dom'
import { Group } from '../../../../types/common'

jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
  }
})

const mockedUseParams = jest.mocked(useParams)

class GroupHomeTest {
  page: RenderResult
  group: Group
  constructor (name: string, mockGroup: Group) {
    mockedUseParams.mockReturnValue({
      name
    })

    mockServer.use(rest.get(`http://localhost/p/groups/${name}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockGroup))
    }))

    this.page = renderPage(<GroupHome />)
    this.group = mockGroup
  }

  async assertHeader (): Promise<void> {
    const { getByText } = this.page

    await waitFor(() => {
      expect(getByText(this.group.title)).toBeInTheDocument()
    })

    expect(this.page.container).toMatchSnapshot()
  }
}

it('should match snapshot properly', async () => {
  const test = new GroupHomeTest('test', Boring)

  await test.assertHeader()
})
