import type { PropsWithChildren } from 'react';
import React from 'react';

import ErrorLayout from './ErrorLayout';

type CatchError = Error | null;
type ErrorBoundaryFallbackFC = (err: CatchError) => JSX.Element;

interface ErrorBoundaryState {
  error: CatchError;
}
const initialState: ErrorBoundaryState = { error: null };
const defaultFallback: ErrorBoundaryFallbackFC = (err) => (
  <div>{err ? err.message : '发生未知错误'}</div>
);

// Error boundaries currently have to be classes.
// ref: https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
export default class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallback: ErrorBoundaryFallbackFC }>,
  ErrorBoundaryState
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { fallback } = this.props;
    const error = this.state.error;

    if (error) {
      const fb = fallback;
      return <ErrorLayout>{fb(this.state.error)}</ErrorLayout>;
    }
    return this.props.children;
  }
}

export const withErrorBoundary = <T extends Object>(
  Children: React.FC<T>,
  fallback?: ErrorBoundaryFallbackFC,
) => {
  return function PageWithErrorBoundary(props: T) {
    return (
      <ErrorBoundary fallback={fallback ?? defaultFallback}>
        <Children {...props} />
      </ErrorBoundary>
    );
  };
};
