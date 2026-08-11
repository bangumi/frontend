import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination';
import { useSubject } from '@bangumi/website/hooks/use-subject';
import { useSubjectTopics } from '@bangumi/website/hooks/use-subject-topics';

import SubjectBoard from './components/SubjectBoard';

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
