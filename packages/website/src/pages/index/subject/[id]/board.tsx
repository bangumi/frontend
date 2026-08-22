import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { useSubject } from '@bangumi/website/hooks/use-subject.ts';
import { useSubjectTopics } from '@bangumi/website/hooks/use-subject-topics.ts';

import SubjectBoard from './components/SubjectBoard.tsx';

const PAGE_SIZE = 10;

function SubjectBoardPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const subject = useSubject(subjectID);
  const { data: topics, total } = useSubjectTopics(subjectID, pageSize, offset);
  const [, navigate] = useTransitionNavigate();

  if (!subject || !topics) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <>
      <Helmet title={`${subject.nameCN || subject.name} - 讨论版`} />
      <SubjectBoard
        subject={subject}
        topics={topics}
        total={total ?? 0}
        currentPage={curPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default withErrorBoundary(SubjectBoardPage, {
  404: () => <div>没有找到条目</div>,
});
