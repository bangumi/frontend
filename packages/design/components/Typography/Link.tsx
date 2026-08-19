import type { JSX, PropsWithChildren } from 'react';
import React from 'react';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { css, cx } from '@bangumi/styled-system/css';

const link = css({
  display: 'inline-block',
  color: 'link',
  cursor: 'pointer',
  transitionProperty: 'color, text-decoration-color',
  transitionDuration: 'normal',
  transitionTimingFunction: 'standard',
  '&:link, &:visited, &:active': { textDecoration: 'none' },
  _hover: { color: 'link.hover', textDecoration: 'underline' },
  _active: { color: 'link.hover', textDecoration: 'underline' },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
  '&.bgm-link--title': {
    color: 'inherit',
    textStyle: 'title',
    _hover: { color: 'link.hover', textDecoration: 'none' },
    _active: { color: 'link.hover', textDecoration: 'none' },
  },
  '&.bgm-link--subtle': {
    color: 'link.subtle',
    _hover: { color: 'link.hover', textDecoration: 'none' },
    _active: { color: 'link.hover', textDecoration: 'none' },
  },
});

const linkBold = css({ fontWeight: 'bold' });

interface PureLinkProps {
  isExternal?: boolean;
  /** @deprecated Prefer typography on the link container for structural emphasis. */
  fontWeight?: 'bold';
  noStyle?: boolean;
  /** Controls link emphasis. Only title applies a text style; other variants inherit typography. */
  variant?: 'default' | 'title' | 'subtle';
}

export type LinkProps = PureLinkProps & RouterLinkProps;

const getLinkClassName = (
  className: string | undefined,
  fontWeight: PureLinkProps['fontWeight'],
  variant: NonNullable<PureLinkProps['variant']>,
) =>
  cx(
    'bgm-link',
    link,
    fontWeight === 'bold' && linkBold,
    variant !== 'default' && `bgm-link--${variant}`,
    className,
  );

/**
 * 有些场景，to 属性无法覆盖到，比如返回上一页，我们需要 navigate(-1)，可我们又需要 Link 的样式
 * 纯 Link 组件就是仅保留了样式，而无任何逻辑。
 */
export function PureLink({
  children,
  className,
  fontWeight,
  variant = 'default',
  ...rest
}: PropsWithChildren<PureLinkProps & JSX.IntrinsicElements['div']>) {
  return (
    <div className={getLinkClassName(className, fontWeight, variant)} {...rest}>
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
  variant = 'default',
  ...rest
}) => {
  const resolvedClassnames = noStyle ? className : getLinkClassName(className, fontWeight, variant);

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
