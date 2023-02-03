import type React from 'react';
import { createContext, useContext } from 'react';

interface ITransitionContext {
  pending: boolean;
  startTransition: React.TransitionStartFunction;
}

export const TransitionContext = createContext<ITransitionContext>(null!);
export const useTransitionContext = () => useContext(TransitionContext);
