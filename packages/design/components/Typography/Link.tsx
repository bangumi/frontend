import type { JSX, PropsWithChildren } from 'react';
import React from 'react';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { css, cx } from '@bangumi/styled-system/css';

const link = css({
  display: 'inline-block',
  /* 对齐原站 a.l：正常 #0084B4，hover 变亮 #02A3FB 加下划线 */
  color: '#0084b4',
  cursor: 'pointer',
  '&:link, &:visited, &:active': { textDecoration: 'none' },
  _hover: { color: '#02a3fb', textDecoration: 'underline' },
});

const linkBold = css({ fontWeight: 'bold' });

interface PureLinkProps {
  isExternal?: boolean;
  fontWeight?: 'bold';
  noStyle?: boolean;
}

export type LinkProps = PureLinkProps & RouterLinkProps;

/**
 * 有些场景，to 属性无法覆盖到，比如返回上一页，我们需要 navigate(-1)，可我们又需要 Link 的样式
 * 纯 Link 组件就是仅保留了样式，而无任何逻辑。
 */
export function PureLink({
  children,
  className,
  fontWeight,
  ...rest
}: PropsWithChildren<PureLinkProps & JSX.IntrinsicElements['div']>) {
  return (
    <div className={cx('bgm-link', link, fontWeight === 'bold' && linkBold, className)} {...rest}>
      {children}
    </div>
  );
}

const Link: React.FC<LinkProps> = ({
  to,
  className,
  children,
  fontWeight,
  isExternal = false,
  noStyle = false,
  ...rest
}) => {
  const resolvedClassnames = noStyle
    ? className
    : cx('bgm-link', link, fontWeight === 'bold' && linkBold, className);

  if (isExternal && typeof to === 'string') {
    return (
      <a className={resolvedClassnames} href={to} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink className={resolvedClassnames} to={to} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
