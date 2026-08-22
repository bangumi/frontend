import React from 'react';

import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

import {
  aboutContent,
  aboutList,
  aboutListItem,
  AboutNav,
  aboutParagraph,
  aboutSection,
  aboutSectionTitle,
  aboutTitle,
  inlineLink,
} from './index.tsx';

const Link2Us: React.FC = () => (
  <>
    <Helmet title='链接我们' />
    <PageContainer as='main'>
      <div className={aboutContent}>
        <AboutNav />
        <h1 className={aboutTitle}>链接我们</h1>
        <section className={aboutSection}>
          <h2 className={aboutSectionTitle}>申请条件</h2>
          <ul className={aboutList}>
            <li className={aboutListItem}>网站内容与 ACG（动画、漫画、游戏）相关；</li>
            <li className={aboutListItem}>内容健康，无恶意程序与违规信息；</li>
            <li className={aboutListItem}>已添加指向 Bangumi 的链接。</li>
          </ul>
        </section>
        <section className={aboutSection}>
          <h2 className={aboutSectionTitle}>申请方式</h2>
          <p className={aboutParagraph}>
            满足条件的站点，请到站务论坛发布申请帖，附上站点名称、地址与一句简介：
          </p>
          <p className={aboutParagraph}>
            <a className={inlineLink} href='https://bgm.tv/group/issues'>
              https://bgm.tv/group/issues
            </a>
          </p>
        </section>
        <section className={aboutSection}>
          <h2 className={aboutSectionTitle}>审核说明</h2>
          <p className={aboutParagraph}>
            我们会在核实站点信息后尽快处理申请。由于精力有限，暂时只接受与 ACG
            相关的站点申请，敬请谅解。
          </p>
        </section>
      </div>
    </PageContainer>
  </>
);

export default Link2Us;
