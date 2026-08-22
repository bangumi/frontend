import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { useSubject } from '@bangumi/website/hooks/use-subject.ts';
import { useSubjectIndexes } from '@bangumi/website/hooks/use-subject-indexes.ts';

import SubjectIndexes from './components/SubjectIndexes.tsx';

const PAGE_SIZE = 20;

function SubjectIndexesPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const subject = useSubject(subjectID);
  const { data: indexes, total } = useSubjectIndexes(subjectID, pageSize, offset);
  const [, navigate] = useTransitionNavigate();

  if (!subject || !indexes) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <>
      <Helmet title={`${subject.nameCN || subject.name} - 目录`} />
      <SubjectIndexes
        subject={subject}
        indexes={indexes}
        total={total ?? 0}
        currentPage={curPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default withErrorBoundary(SubjectIndexesPage, {
  404: () => <div>没有找到条目</div>,
});
