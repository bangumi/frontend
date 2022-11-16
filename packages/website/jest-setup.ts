import 'whatwg-fetch'

import { server } from './src/mocks/server'
import timezoneMock from 'timezone-mock'

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  timezoneMock.register('Etc/GMT')
})

afterEach(() => {
  server.resetHandlers()
  timezoneMock.unregister()
})

afterAll(() => {
  server.close()
})
