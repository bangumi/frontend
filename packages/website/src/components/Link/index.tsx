import type { PropsWithChildren } from 'react';
import React, { createContext, forwardRef, useContext, useTransition } from 'react';
import type { LinkProps, NavLinkProps } from 'react-router-dom';
import { useHref, useLinkClickHandler, useLocation, useResolvedPath } from 'react-router-dom';

interface ILinkContext {
  pending: boolean;
  startTransition: React.TransitionStartFunction;
}
const LinkContext = createContext<ILinkContext>(null!);

export const LinkProvider = ({ children }: PropsWithChildren) => {
  const [pending, startTransition] = useTransition();
  return (
    <LinkContext.Provider
      value={{
        pending,
        startTransition,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, state, target, preventScrollReset, relative, onClick, ...rest }, ref) => {
    const { startTransition } = useContext(LinkContext);
    const href = useHref(to, { relative });
    const internalOnClick = useLinkClickHandler(to, {
      replace,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state,
      target,
      preventScrollReset,
      relative,
    });
    const handleOnClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
      onClick?.(event);
      startTransition(() => {
        internalOnClick(event);
      });
    };
    return <a {...rest} href={href} onClick={handleOnClick} ref={ref} />;
  },
);

export const useLinkContext = () => useContext(LinkContext);

/**
 * NavLink
 * https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L470
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLinkWithRef(
  {
    'aria-current': ariaCurrentProp = 'page',
    caseSensitive = false,
    className: classNameProp = '',
    end = false,
    style: styleProp,
    to,
    children,
    ...rest
  },
  ref,
) {
  const location = useLocation();
  const path = useResolvedPath(to);
  const { pending } = useLinkContext();

  let locationPathname = location.pathname;
  let toPathname = path.pathname;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    toPathname = toPathname.toLowerCase();
  }

  const isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === '/');

  const ariaCurrent = isActive ? ariaCurrentProp : undefined;

  return (
    <Link {...rest} aria-current={ariaCurrent} ref={ref} to={to}>
      {typeof children === 'function' ? children({ isActive, isPending: pending }) : children}
    </Link>
  );
});
