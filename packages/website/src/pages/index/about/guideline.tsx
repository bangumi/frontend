import React from 'react';

import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';

import {
  aboutContent,
  aboutList,
  aboutListItem,
  AboutNav,
  aboutParagraph,
  aboutTitle,
} from './index';

const Guideline: React.FC = () => (
  <>
    <Helmet title='社区指导原则' />
    <PageContainer as='main'>
      <div className={aboutContent}>
        <AboutNav />
        <h1 className={aboutTitle}>社区指导原则</h1>
        <p className={aboutParagraph}>
          Bangumi 是一个开放的社区，为了让大家在这里愉快地交流和分享，请所有用户共同遵守以下原则：
        </p>
        <ol className={aboutList}>
          <li className={aboutListItem}>
            友善交流：尊重每一位用户，不进行人身攻击、引战或恶意骚扰，理性表达不同观点。
          </li>
          <li className={aboutListItem}>
            尊重版权：不要在站内上传或分享侵犯他人版权的资源，转载他人内容时注明出处。
          </li>
          <li className={aboutListItem}>
            条目编辑规范：编辑条目时应如实填写信息并遵循现有规范，不要恶意修改、删除他人的编辑成果。
          </li>
          <li className={aboutListItem}>
            拒绝广告与刷屏：不要发布商业广告、垃圾信息，也不要重复刷屏影响他人浏览。
          </li>
          <li className={aboutListItem}>保护隐私：未经本人同意，不要公开他人的个人隐私信息。</li>
          <li className={aboutListItem}>遵守法律法规：不发布违反法律法规及公序良俗的内容。</li>
        </ol>
      </div>
    </PageContainer>
  </>
);

export default Guideline;
