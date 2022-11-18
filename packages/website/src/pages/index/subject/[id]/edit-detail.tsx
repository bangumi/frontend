import React from 'react';
import { useParams } from 'react-router-dom';
import GlobalLayout from '../../../../components/GlobalLayout';
import DetailEditor from './components/WikiEditor/DetailEditor';

const WikiEditPage: React.FC = () => {
  const { id } = useParams();
  return (
    <GlobalLayout>
      <span>维基编辑页: {id}</span>
      <DetailEditor />
    </GlobalLayout>
  );
};

export default WikiEditPage;
