import { useTransition } from 'react'
import { useNavigate, To, NavigateOptions, NavigateFunction } from 'react-router-dom'

// https://github.com/bangumi/frontend/issues/125
export const useTransitionNavigate = (): [boolean, NavigateFunction] => {
  const navigate = useNavigate()
  const [pending, startTransition] = useTransition()
  return [
    pending,
    (to: To | number, options?: NavigateOptions) => {
      startTransition(() => {
        if (typeof to === 'number') {
          navigate(to)
        } else {
          navigate(to, options)
        }
      })
    },
  ]
}
