import React from 'react';

import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';

const title = css({
  marginBottom: '24px',
  color: '#1f1c1c',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '38px',
});

const section = css({ marginBottom: '32px', _last: { marginBottom: '0' } });

const sectionTitle = css({
  marginBottom: '12px',
  color: '#1f1c1c',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '28px',
});

const description = css({
  margin: '0 0 12px',
  color: '#595555',
  lineHeight: '24px',
  _last: { marginBottom: '0' },
});

const linkList = css({ margin: '0', padding: '0', listStyle: 'none' });

const linkListItem = css({ marginBottom: '8px', _last: { marginBottom: '0' } });

const link = css({ color: '#3db3f5', _hover: { color: '#54b5df' } });

const Goodies: React.FC = () => (
  <>
    <Helmet title='周边' />
    <PageContainer>
      <h1 className={title}>周边与天窗</h1>
      <section className={section}>
        <h2 className={sectionTitle}>什么是天窗</h2>
        <p className={description}>
          {'「天窗联盟」（通常简称「天窗」）是 Bangumi 旗下的同人创作企划，为同人志、同人周边等'}
          {'创作提供发布、展示与交流的平台。创作者可以在天窗登记自己的作品，读者也可以按作品、'}
          {'社团等线索查找感兴趣的同人内容。'}
        </p>
        <p className={description}>
          {'Bangumi 的周边板块则收录与动画、漫画、游戏等作品相关的周边商品与同人创作信息，包括'}
          {'同人志、徽章、挂画、手办等，方便大家发现和整理自己关注作品的周边情报。'}
        </p>
      </section>
      <section className={section}>
        <h2 className={sectionTitle}>如何参与</h2>
        <p className={description}>
          {'如果你是创作者，可以在'}
          <a className={link} href='https://bgm.tv/doujin' target='_blank' rel='noreferrer'>
            天窗联盟
          </a>
          {'登记自己的同人志或同人周边，让更多人看到你的作品。'}
        </p>
        <p className={description}>
          {'想和其他同好交流创作心得、获取最新的同人与周边信息，可以加入'}
          <a className={link} href='https://bgm.tv/group/doujin' target='_blank' rel='noreferrer'>
            同人小组
          </a>
          {'参与讨论。'}
        </p>
      </section>
      <section className={section}>
        <h2 className={sectionTitle}>相关链接</h2>
        <ul className={linkList}>
          <li className={linkListItem}>
            <a className={link} href='https://bgm.tv/doujin' target='_blank' rel='noreferrer'>
              天窗联盟（同人企划）
            </a>
          </li>
          <li className={linkListItem}>
            <a className={link} href='https://bgm.tv/group/doujin' target='_blank' rel='noreferrer'>
              同人小组
            </a>
          </li>
          <li className={linkListItem}>
            <a className={link} href='https://bgm.tv/goodies' target='_blank' rel='noreferrer'>
              旧站周边页
            </a>
          </li>
        </ul>
      </section>
    </PageContainer>
  </>
);

export default Goodies;
