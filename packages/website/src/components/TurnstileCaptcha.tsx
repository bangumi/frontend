import { Turnstile } from '@marsidev/react-turnstile';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

const wrapper = css({
  display: 'flex',
  justifyContent: 'center',
  '& div': {
    height: '78px',
  },
});

interface TurnstileCaptchaProps {
  /** turnstile action，用于 Cloudflare 后台区分场景 */
  action: string;
  /** 验证成功回调，token 失效（过期/错误）时回调 null */
  onToken: (token: string | null) => void;
}

/**
 * Cloudflare Turnstile 验证码，site key 与登录页一致（由环境注入）。
 * dev 环境使用测试 key，自动通过无需交互。
 */
const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({ action, onToken }) => {
  return (
    <div className={wrapper}>
      <Turnstile
        options={{ theme: 'light', size: 'invisible', action }}
        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
        onSuccess={onToken}
        onError={() => onToken(null)}
        onExpire={() => onToken(null)}
      />
    </div>
  );
};

export default TurnstileCaptcha;
