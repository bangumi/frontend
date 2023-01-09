import type { PropsWithChildren } from 'react';
import React from 'react';

type CatchError =
  | (Error & {
      status?: SupportedErrorCode;
    })
  | null;
type ErrorBoundaryFallbackFunc = (err: CatchError) => JSX.Element;

enum SupportedErrorCode {
  NotFound = 404,
}
type FallbackArg = Record<SupportedErrorCode, JSX.Element | ErrorBoundaryFallbackFunc | null>;

interface ErrorBoundaryState {
  error: CatchError;
}
const initialState: ErrorBoundaryState = { error: null };
const UnknownError = (code: number) => <div>{code} | 发生未知错误</div>;

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

    // 有错误码则回调，但尚不知道 error 会不会出现没有错误码的情况。
    if (error?.status) {
      const fb = fallback[error.status];
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
