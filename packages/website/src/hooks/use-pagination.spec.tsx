import React, { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { usePaginationParams } from './use-pagination'
import { renderHook } from '@testing-library/react-hooks'

const wrapper = (entry: string) => ({ children }: PropsWithChildren<{}>) => {
  return <MemoryRouter initialEntries={[entry]}>{children}</MemoryRouter>
}

describe('use-pagination hook', () => {
  test('plainly path', async () => {
    const { result } = renderHook(() => usePaginationParams(), { wrapper: wrapper('') })
    expect(result.current.curPage).toBe(1)
    expect(result.current.offset).toBe(0)
    expect(result.current.pageSize).toBe(20)
  })
  test('page 12, pageSize 30, should success', async () => {
    const { result } = renderHook(() => usePaginationParams(), {
      wrapper: wrapper('?page=12&limit=30')
    })
    expect(result.current.curPage).toBe(12)
    expect(result.current.offset).toBe((12 - 1) * 30)
    expect(result.current.pageSize).toBe(30)
  })
  test('negative page & limit', async () => {
    const { result } = renderHook(() => usePaginationParams(), {
      wrapper: wrapper('?page=-1&limit=-30')
    })
    expect(result.current.curPage).toBe(1)
    expect(result.current.offset).toBe(0)
    expect(result.current.pageSize).toBe(20)
  })
  test('page & limit undefined or null', async () => {
    const { result } = renderHook(() => usePaginationParams(), {
      wrapper: wrapper('?page=null&limit=undefined')
    })
    expect(result.current.curPage).toBe(1)
    expect(result.current.offset).toBe(0)
    expect(result.current.pageSize).toBe(20)
  })
})
