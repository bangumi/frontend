import pageRoutes from '~react-pages';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';

import { NoticeProvider } from '@bangumi/website/hooks/use-notify';

import { UserProvider } from './hooks/use-user';

const App = () => {
  return (
    <HelmetProvider>
      <UserProvider>
        <NoticeProvider>
          <Suspense fallback={null}>{useRoutes(pageRoutes)}</Suspense>
        </NoticeProvider>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;
