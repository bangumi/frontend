import React from 'react';

// import DetailEditor from './components/WikiEditor/DetailEditor';
import { _TEST_SUBJECTS_, WikiEditTabs } from './_shared';
import WikiLayout from './components/WikiLayout';

const WikiHistoryPage = () => {
  return (
    <WikiLayout id={_TEST_SUBJECTS_} activeTab={WikiEditTabs.History} name='hi'>
      历史
    </WikiLayout>
  );
};

export default WikiHistoryPage;
