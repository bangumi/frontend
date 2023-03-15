import React from 'react';
import { Outlet } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

const GroupTopicPage = () => withErrorBoundary(Outlet, { 404: <>Topic Not found</> });

export default GroupTopicPage;
