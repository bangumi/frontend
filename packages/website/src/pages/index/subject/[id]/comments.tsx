import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import type { CollectionType } from '@bangumi/client/client.ts';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { useSubject } from '@bangumi/website/hooks/use-subject.ts';
import { useSubjectComments } from '@bangumi/website/hooks/use-subject-comments.ts';

import SubjectComments from './components/SubjectComments.tsx';

const PAGE_SIZE = 20;

function SubjectCommentsPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const [searchParams] = useSearchParams();
  const rawType = searchParams.get('type');
  const type = rawType ? (Number(rawType) as CollectionType) : undefined;
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const subject = useSubject(subjectID);
  const { data: comments, total, mutate } = useSubjectComments(subjectID, pageSize, offset, type);
  const [, navigate] = useTransitionNavigate();

  if (!subject || !comments) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: type === undefined ? `page=${page}` : `type=${type}&page=${page}` });
  };

  return (
    <>
      <Helmet title={`${subject.nameCN || subject.name} - 吐槽`} />
      <SubjectComments
        subject={subject}
        subjectID={subjectID}
        comments={comments}
        total={total ?? 0}
        currentPage={curPage}
        pageSize={pageSize}
        type={type}
        onPageChange={handlePageChange}
        mutate={mutate}
      />
    </>
  );
}

export default withErrorBoundary(SubjectCommentsPage, {
  404: () => <div>没有找到条目</div>,
});
