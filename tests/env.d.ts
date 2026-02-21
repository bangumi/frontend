// @types/whatwg-fetch has wrong type def
// https://github.com/github/fetch#importing

declare module 'whatwg-fetch' {
  const fetch: typeof window.fetch;
  export { fetch };
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const src: string;
  export default src;

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}
