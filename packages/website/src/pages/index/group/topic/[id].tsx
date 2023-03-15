import React from 'react';
import { Outlet } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

export default withErrorBoundary(Outlet, { 404: <>Topic Not found</> });
