import React, { PropsWithChildren } from 'react'

// Error boundaries currently have to be classes.
// ref: https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
export default class ErrorBoundary extends React.Component<PropsWithChildren<{fallback: JSX.Element}>> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError (error: any) {
    return {
      hasError: true,
      error
    }
  }

  render () {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
