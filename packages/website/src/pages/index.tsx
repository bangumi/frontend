import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalLayout from '../components/GlobalLayout';

// https://github.com/bangumi/frontend/discussions/126
const RootIndex = () => {
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  );
};

export default RootIndex;
