import React from 'react';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import { PmListPage } from './components/PmListPage';

const PmOutboxPage = (): React.ReactElement => <PmListPage folder='outbox' />;

export default withErrorBoundary(PmOutboxPage);
