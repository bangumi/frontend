import React from 'react';

import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectLink } from '@bangumi/utils/pages';

const { Link } = Typography;

const mediaContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'component.media.caption',
});

const mediaLink = css({
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  aspectRatio: '1',
  borderWidth: '1px',
  borderColor: 'media.frame.border',
  borderRadius: 'sm',
  background: 'media.frame.background',
  boxShadow: 'raised',
  transitionProperty: 'border-color, box-shadow',
  transitionDuration: 'fast',
  transitionTimingFunction: 'standard',
  _hover: {
    borderColor: 'media.frame.borderHover',
    boxShadow: 'media.frame.hover',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
  _active: {
    boxShadow: 'none',
  },
});

const mediaImage = css({
  display: 'block',
  width: '100%',
  height: '100%',
  borderWidth: '0',
  borderRadius: '0',
  background: 'transparent',
  objectFit: 'cover',
  objectPosition: 'center top',
});

const mediaTitle = css({
  margin: '0',
  overflow: 'hidden',
  fontSize: 'bodySm',
  fontWeight: 'normal',
  lineHeight: '16px',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
});

export interface SubjectMediaCardProps {
  subjectId: number;
  name: string;
  nameCN?: string;
  imageUrl?: string;
}

/** 方形条目封面与标题，供关联条目和相关推荐复用。 */
export default function SubjectMediaCard({
  subjectId,
  name,
  nameCN,
  imageUrl,
}: SubjectMediaCardProps) {
  return (
    <div className={mediaContent}>
      <Link to={getSubjectLink(subjectId)} className={mediaLink} noStyle title={nameCN || name}>
        <img src={imageUrl} className={mediaImage} loading='lazy' alt='' />
      </Link>
      <p className={mediaTitle}>
        <Link variant='subtle' to={getSubjectLink(subjectId)}>
          {name}
        </Link>
      </p>
    </div>
  );
}
