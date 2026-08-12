import React from 'react';

import { EmptyStar, FilledStar, HalfStar } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';

const rate = css({
  display: 'flex',
  flexDirection: 'row',
});

const rateStar = css({
  marginRight: '3px',
  '&:last-child': {
    marginRight: '0',
  },
});

export interface RateProps {
  /** 评分的分值, 范围 0 ~ 10 */
  value: number;
}

const Rate: React.FC<RateProps> = (props) => {
  const { value } = props;

  const numFiledStars = Math.floor(value / 2);
  const numHalfStars = Math.floor(value % 2);
  const numEmptyStars = 5 - numHalfStars - numFiledStars;

  return (
    <div className={cx('bgm-rate', rate)}>
      {Array.from({ length: numFiledStars }).map((_, i) => (
        <FilledStar
          className={cx('bgm-rate__star', rateStar)}
          key={`filled-${i}`}
          data-testid='filled'
        />
      ))}
      {numHalfStars ? (
        <HalfStar className={cx('bgm-rate__star', rateStar)} data-testid='half' />
      ) : null}
      {Array.from({ length: numEmptyStars }).map((_, i) => (
        <EmptyStar
          className={cx('bgm-rate__star', rateStar)}
          key={`empty-${i}`}
          data-testid='empty'
        />
      ))}
    </div>
  );
};

export default Rate;
