import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate.ts';
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination.ts';
import { useSubject } from '@bangumi/website/hooks/use-subject.ts';
import { useSubjectReviews } from '@bangumi/website/hooks/use-subject-reviews.ts';

import SubjectReviews from './components/SubjectReviews.tsx';

const PAGE_SIZE = 10;

function SubjectReviewsPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { curPage, pageSize, offset } = usePaginationParams(PAGE_SIZE);
  const subject = useSubject(subjectID);
  const { data: reviews, total } = useSubjectReviews(subjectID, pageSize, offset);
  const [, navigate] = useTransitionNavigate();

  if (!subject || !reviews) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` });
  };

  return (
    <>
      <Helmet title={`${subject.nameCN || subject.name} - 评论`} />
      <SubjectReviews
        subject={subject}
        reviews={reviews}
        total={total ?? 0}
        currentPage={curPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default withErrorBoundary(SubjectReviewsPage, {
  404: () => <div>没有找到条目</div>,
});
