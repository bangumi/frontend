import React, { useState } from 'react';
import { useDidMount } from 'rooks';

import { ozaClient } from '@bangumi/client';
import { Button, toast } from '@bangumi/design';

import styles from './style.module.less';

const SUCCESS_REDIRECT_DELAY = 5000;

const Logout = () => {
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  useDidMount(() => {
    ozaClient.logout({}).then(({ status, data }) => {
      if (status !== 200) {
        toast(data.message);
        return;
      }

      setIsLogoutSuccess(true);
    });
  });

  React.useEffect(() => {
    if (!isLogoutSuccess) {
      return;
    }

    const timeout = setTimeout(() => {
      // 顺便刷新页面，去掉登陆态
      window.location.href = '/';
    }, SUCCESS_REDIRECT_DELAY);
  }, [isLogoutSuccess]);

  if (!isLogoutSuccess) {
    // TODO: 载入态
    return;
  }

  return (
    <div className={styles.notice}>
      <h2 className={styles.noticeTitle}>Bangumi 提示信息</h2>
      <div>您已成功登出，我们随时欢迎您回来。</div>
      <Button type='secondary' size='medium'>
        点此手动跳转
      </Button>
    </div>
  );
};

export default Logout;
