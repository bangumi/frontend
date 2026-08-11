import type { PropsWithChildren } from 'react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

import Footer from '../Footer';
import Header from '../Header';

const container = css({ minHeight: '100vh', display: 'flex', flexDirection: 'column' });

const contentWrapper = css({
  position: 'relative',
  flex: '1 0 auto',
  width: '100%',
  boxSizing: 'border-box',
});

const GlobalLayout = (props: PropsWithChildren<{}>) => {
  return (
    <div className={container}>
      <Header />
      <div className={contentWrapper}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
