import type { PropsWithChildren } from 'react';
import React from 'react';

type CatchError =
  | (Error & {
      status?: SupportedErrorCode;
    })
  | null;
type ErrorBoundaryFallbackFunc = (err: CatchError) => JSX.Element;

export enum SupportedErrorCode {
  NotFound = 404,
}
type FallbackArg = Record<SupportedErrorCode, JSX.Element | ErrorBoundaryFallbackFunc | null>;

interface ErrorBoundaryState {
  error: CatchError;
}
const initialState: ErrorBoundaryState = { error: null };
const UnknownError = (code?: number) => <div>{code && `${code} | `}发生未知错误</div>;

// Error boundaries currently have to be classes.
// ref: https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
export default class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallback: FallbackArg }>,
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
      const fb = error.status ? fallback[error.status] : undefined;
      if (typeof fb === 'function') {
        return fb(this.state.error);
      }
      return fb ?? UnknownError(error.status);
    }
    return this.props.children;
  }
}

export const withErrorBoundary = (fallback: FallbackArg) => {
  return (Children: React.FC) =>
    (...props: any) =>
      (
        <ErrorBoundary fallback={fallback}>
          <Children {...props} />
        </ErrorBoundary>
      );
};
