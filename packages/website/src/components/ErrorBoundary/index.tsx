import { HttpError } from 'oazapfts';
import type { PropsWithChildren } from 'react';
import React from 'react';

import ErrorLayout from './ErrorLayout';

type CatchError = HttpError | Error | null;
type ErrorBoundaryFallbackFC = Record<string, ((err: CatchError) => JSX.Element) | JSX.Element>;

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
      let fb: ((err: CatchError) => JSX.Element) | JSX.Element | undefined;
      let msg = error.message ?? '发生未知错误';
      let reqID: string | null = null;
      if (error instanceof HttpError) {
        reqID = error.headers.get('x-ray');
        const { message = msg, code = error.status } = (error.data ?? {}) as {
          message?: string;
          code?: string;
        };

        msg = message;

        // 选择对应 statusCode / err code 的 fallback
        fb = fallback?.[code];
      }
      return (
        <ErrorLayout requestID={reqID}>
          {typeof fb === 'function' ? fb(this.state.error) : fb ?? msg}
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
