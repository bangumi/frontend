import React from 'react';
import { Outlet } from 'react-router-dom';

import GlobalLayout from '@bangumi/website/components/GlobalLayout/index.tsx';

// https://github.com/bangumi/frontend/discussions/126
const RootIndex = () => {
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  );
};

export default RootIndex;
