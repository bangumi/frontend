import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import pageRoutes from '~react-pages';
import { LinkProvider as RouterLinkProvider } from './components/Link';
import { UserProvider } from './hooks/use-user';

const App = () => {
  return (
    <RouterLinkProvider>
      <UserProvider>
        <Suspense fallback={null}>{useRoutes(pageRoutes)}</Suspense>
      </UserProvider>
    </RouterLinkProvider>
  );
};

export default App;
