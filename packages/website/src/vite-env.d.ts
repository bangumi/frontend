/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY: string;
}

declare module '*.svg' {
  import type { ComponentProps,FC } from 'react';

  const src: string;
  export default src;

  export const ReactComponent: FC<
    ComponentProps<'svg'> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
}
