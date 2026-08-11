import React from 'react';

import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';

import {
  aboutContainer,
  AboutNav,
  aboutParagraph,
  aboutSection,
  aboutSectionTitle,
  aboutTitle,
} from './index';

const Copyright: React.FC = () => (
  <>
    <Helmet title='版权声明' />
    <PageContainer className={aboutContainer}>
      <AboutNav />
      <h1 className={aboutTitle}>版权声明</h1>
      <section className={aboutSection}>
        <h2 className={aboutSectionTitle}>用户发布的内容</h2>
        <p className={aboutParagraph}>
          用户在 Bangumi
          发布的内容（包括但不限于日志、小组话题与回复、条目吐槽、图片等）著作权归发布者本人所有，发布者对其发布内容负相应责任。
        </p>
        <p className={aboutParagraph}>
          Bangumi
          仅为用户提供内容存储与展示服务，不参与用户内容的创作，也不对用户发布内容的真实性、合法性作出保证。
        </p>
      </section>
      <section className={aboutSection}>
        <h2 className={aboutSectionTitle}>站方内容</h2>
        <p className={aboutParagraph}>
          本站自身的页面、文字与设计等站方内容，未经许可不得擅自复制、转载或用于商业用途。
        </p>
      </section>
      <section className={aboutSection}>
        <h2 className={aboutSectionTitle}>转载与引用</h2>
        <p className={aboutParagraph}>
          转载本站内容时请注明出处与原作者；在符合著作权保护的前提下，欢迎对本站内容进行合理引用。
        </p>
      </section>
      <section className={aboutSection}>
        <h2 className={aboutSectionTitle}>侵权处理</h2>
        <p className={aboutParagraph}>
          如果您认为本站内容侵犯了您的合法权益，请通过站务途径与我们联系，我们会在核实后尽快处理。
        </p>
      </section>
    </PageContainer>
  </>
);

export default Copyright;
