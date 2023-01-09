import React from 'react';

import { useUser } from '@bangumi/website/hooks/use-user';

import UserHome from '../components/UserHome';

const HomePage = () => {
  const { user } = useUser();

  if (user) {
    return <UserHome />;
  }

  const handleTheme = () => {
    const theme = document.documentElement.dataset.theme;

    const setLight = () => {
      delete document.documentElement.dataset.theme;
    };

    const setDark = () => {
      document.documentElement.dataset.theme = 'dark';
    };

    theme === 'dark' ? setLight() : setDark();
  };

  // TODO: 未登录态主页
  return (
    <div>
      Hi! This is Home page
      <button onClick={handleTheme}>Dark Switch</button>
    </div>
  );
};

export default HomePage;
