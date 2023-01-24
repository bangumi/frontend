import type { PropsWithChildren } from 'react';
import React from 'react';

type ErrorBoundaryFallbackFunc = (err: unknown) => JSX.Element;
type FallbackArg = JSX.Element | ErrorBoundaryFallbackFunc;
// Error boundaries currently have to be classes.
// ref: https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
export default class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallback: FallbackArg }>
> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    const { fallback } = this.props;
    if (this.state.hasError) {
      if (typeof fallback === 'function') {
        return fallback(this.state.error);
      }
      return fallback;
    }
    return this.props.children;
  }
}

const defaultFallback = <div>Error Occur</div>;
/**
 * 用于包裹页面组件，页面组件无 props，如需传递数据使用 `useOutletContext`。
 */
export const withErrorBoundary = <T extends Object>(
  Children: React.FC<T>,
  fallback?: FallbackArg,
) => {
  return function PageWithErrorBoundary(props: T) {
    return (
      <ErrorBoundary fallback={fallback ?? defaultFallback}>
        <Children {...props} />
      </ErrorBoundary>
    );
  };
};
