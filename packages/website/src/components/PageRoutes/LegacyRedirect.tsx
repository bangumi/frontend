import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getLegacyPageLink } from '@bangumi/utils/pages.ts';
import { redirectTo } from '@bangumi/website/utils/route.ts';

const LegacyRedirect = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    redirectTo(getLegacyPageLink(`${pathname}${search}${hash}`));
  }, [hash, pathname, search]);

  return null;
};

export default LegacyRedirect;
