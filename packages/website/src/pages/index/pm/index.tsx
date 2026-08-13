import React from 'react';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import { PmListPage } from './components/PmListPage';

const PmInboxPage = (): React.ReactElement => <PmListPage folder='inbox' />;

export default withErrorBoundary(PmInboxPage);
