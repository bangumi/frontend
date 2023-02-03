import type { BrowserHistory } from '@remix-run/router';
import { createBrowserHistory } from '@remix-run/router';
import type { Update } from '@remix-run/router/dist/history';
import React, { useLayoutEffect, useRef, useState, useTransition } from 'react';
import type { BrowserRouterProps } from 'react-router-dom';
import { Router } from 'react-router-dom';

import { TransitionContext } from '../hooks/use-transition-context';

/**
 * 一个将react-router与useTransition结合的定制Router，以避免页面跳转时的白屏闪烁
 *
 * Borrowed from https://gist.github.com/perlow/bb7612b25f37667be964f1a1aba42780
 *
 * Based on the original BrowserRouter:
 * https://github.com/remix-run/react-router/blob/98095b8a6c2a911f41cb49ebf8834e67195b9b78/packages/react-router-dom/index.tsx#L287
 */
const SuspenseRouter = ({ basename, children, window }: BrowserRouterProps) => {
  const historyRef = useRef<BrowserHistory>();
  const [pending, startTransition] = useTransition();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window, v5Compat: true });
  }

  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  const setStateAsync = (update: Update) => {
    startTransition(() => {
      setState(update);
    });
  };

  useLayoutEffect(() => history.listen(setStateAsync), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      <TransitionContext.Provider
        value={{
          pending,
          startTransition,
        }}
      >
        {children}
      </TransitionContext.Provider>
    </Router>
  );
};

export default SuspenseRouter;
