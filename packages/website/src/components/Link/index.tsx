import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useTransition,
  forwardRef,
} from 'react';
import { LinkProps, useHref, useLinkClickHandler } from 'react-router-dom';

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
      state,
      target,
      preventScrollReset,
      relative,
    });
    const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onClick?.(event);
      startTransition(() => {
        internalOnClick(event);
      });
    };
    return <a {...rest} href={href} onClick={handleOnClick} ref={ref} />;
  },
);

export const useLinkContext = () => useContext(LinkContext);
