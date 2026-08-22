import React from 'react';
import { Link } from 'react-router-dom';

import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

const page = css({ paddingTop: '8px' });

const header = css({
  paddingBottom: '16px',
  marginBottom: '32px',
  borderBottom: '1px solid #e8e3e3',
});

const headerTitle = css({ margin: '0 0 8px', fontSize: '26px', lineHeight: '1.4' });

const headerDescription = css({ margin: '0', color: '#9f9b9b' });

const section = css({ marginBottom: '32px' });

const sectionTitle = css({ margin: '0 0 12px', fontSize: '18px', lineHeight: '1.4' });

const paragraph = css({
  margin: '0 0 12px',
  fontSize: '14px',
  lineHeight: '1.8',
  color: '#1f1c1c',
});

const link = css({ color: '#54b5df' });

const DevApp: React.FC = () => (
  <>
    <Helmet title='开发者平台' />
    <PageContainer as='main' className={page}>
      <header className={header}>
        <h1 className={headerTitle}>开发者平台</h1>
        <p className={headerDescription}>
          接入 Bangumi 开放 API，为你的应用带来番组数据与用户授权能力
        </p>
      </header>

      <section className={section}>
        <h2 className={sectionTitle}>关于 Bangumi API 与 OAuth</h2>
        <p className={paragraph}>
          Bangumi 为第三方开发者提供开放的 API。通过 OAuth 2.0 授权流程，第三方应用可以在用户
          同意的前提下获取其收藏、评分、进度、时间线等数据，并执行收藏更新等操作，无需保存用户的
          账号密码。
        </p>
        <p className={paragraph}>
          完整的接口说明、认证流程与示例请参见官方文档：
          <a
            className={link}
            href='https://bangumi.github.io/api/'
            target='_blank'
            rel='noreferrer'
          >
            bangumi.github.io/api
          </a>
          。
        </p>
      </section>

      <section className={section}>
        <h2 className={sectionTitle}>申请开发者应用</h2>
        <p className={paragraph}>
          开发者应用需申请后使用，目前请通过站务协助开通：在
          <Link className={link} to='/group/dev'>
            站务论坛
          </Link>
          发帖说明应用名称、用途等信息即可。
        </p>
      </section>
    </PageContainer>
  </>
);

export default DevApp;
