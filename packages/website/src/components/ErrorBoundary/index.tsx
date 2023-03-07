import { HttpError } from 'oazapfts';
import type { PropsWithChildren } from 'react';
import React from 'react';

import ErrorLayout from './ErrorLayout';

type CatchError = HttpError | Error | null;
type ErrorBoundaryFallbackFC = Record<number, ((err: CatchError) => JSX.Element) | JSX.Element>;

interface ErrorBoundaryState {
  error: CatchError;
}
const initialState: ErrorBoundaryState = { error: null };

// Error boundaries currently have to be classes.
// ref: https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
export default class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallback?: ErrorBoundaryFallbackFC }>,
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
      let fb; // fb can be a JSX.Element or a function return a JSX.Element
      let msg = error.message ?? '发生未知错误';
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-member-access
      if (error instanceof HttpError && error.data?.message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        msg = error.data.message;
        if (fallback) {
          fb = fallback[error.status];
        }
      }
      return (
        <ErrorLayout>
          {fb ? (typeof fb === 'function' ? fb(this.state.error) : fb) : msg}
        </ErrorLayout>
      );
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
      <ErrorBoundary fallback={fallback}>
        <Children {...props} />
      </ErrorBoundary>
    );
  };
};
