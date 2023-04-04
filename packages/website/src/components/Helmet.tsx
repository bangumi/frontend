import React from 'react';
import { Helmet as BaseHelmet, type HelmetProps } from 'react-helmet-async';

const Helmet = (props: React.PropsWithChildren<HelmetProps>) => {
  return (
    <BaseHelmet defaultTitle='Bangumi 番组计划' titleTemplate='%s | Bangumi 番组计划' {...props} />
  );
};

export default Helmet;
