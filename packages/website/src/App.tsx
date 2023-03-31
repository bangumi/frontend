import pageRoutes from '~react-pages';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';

import { UserProvider } from './hooks/use-user';

const App = () => {
  return (
    <HelmetProvider>
      <UserProvider>
        <Suspense fallback={null}>{useRoutes(pageRoutes)}</Suspense>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;
