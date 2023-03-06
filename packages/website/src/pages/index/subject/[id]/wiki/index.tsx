import React from 'react';
import { useParams } from 'react-router-dom';

const SubjectPage: React.FC = () => {
  const { id } = useParams();
  return <div>条目ID: {id}</div>;
};

export default SubjectPage;
