import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';

import { NoticeProvider } from '@bangumi/website/hooks/use-notify.tsx';

import { UserProvider } from './hooks/use-user.tsx';
import { pageRoutes } from './routes.tsx';

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
