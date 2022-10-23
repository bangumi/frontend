import { useSearchParams } from 'react-router-dom'

interface IPaginationParams{
  /** 当前页 */
  curPage: number
  /** 每页大小 */
  pageSize: number
  /** 偏移数值 (curPage-1) * pageSize */
  offset: number
}

/**
 * 从参数中提取分页数据
 * @param defaultPageSize - 修改默认的页面的大小，注意，当页面拥有 limit 参数时会失效
 * @returns 分页所需对象
 */
export const usePaginationParams = (defaultPageSize: number = 20): IPaginationParams => {
  const [params] = useSearchParams()
  const page = (() => {
    /**
     * 如果没有对应 param，则获得 null，Number(null) == 0
     */
    const _p = Number(params.get('page'))
    return _p <= 0 ? 1 : _p
  })()

  const pageSize = (() => {
    const limit = Number(params.get('limit'))
    return limit <= 0 ? defaultPageSize : limit
  })()

  return {
    curPage: page,
    pageSize,
    offset: (page - 1) * pageSize
  }
}
