import { useSearchParams } from 'react-router-dom'

interface IPaginationParams {
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
 * @returns 分页所需数据对象
 */
export const usePaginationParams = (defaultPageSize: number = 20): IPaginationParams => {
  const [params] = useSearchParams()

  const unsafePage = parseInt(params.get('page') ?? '')
  const page = Number.isNaN(unsafePage) || unsafePage < 1 ? 1 : unsafePage

  const unsafePageSize = parseInt(params.get('limit') ?? '')
  const pageSize =
    Number.isNaN(unsafePageSize) || unsafePageSize < 1 ? defaultPageSize : unsafePageSize

  return {
    curPage: page,
    pageSize,
    offset: (page - 1) * pageSize,
  }
}
