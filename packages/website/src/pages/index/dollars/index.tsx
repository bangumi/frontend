import React from 'react';

import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';

const FEATURES = [
  {
    title: '浏览条目',
    description: '查看动画、书籍、音乐、游戏等条目的详细信息与相关讨论',
  },
  {
    title: '收藏管理',
    description: '添加收藏、标记观看进度，随时整理自己的收藏列表',
  },
  {
    title: '关注更新',
    description: '关注动画放送与条目更新动态，不错过任何新内容',
  },
  {
    title: '时间线',
    description: '浏览好友动态与个人时间线，分享看番、读书、听歌、玩游戏的日常',
  },
  {
    title: '小组讨论',
    description: '参与小组话题，与同好交流想法',
  },
  {
    title: '离线收藏',
    description: '没有网络时也能查看已收藏的条目',
  },
];

const wrapper = css({ maxWidth: '720px', margin: '0 auto', padding: '40px 0' });

const title = css({
  marginBottom: '12px',
  color: '#1f1c1c',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '38px',
});

const intro = css({ marginBottom: '32px', color: '#9f9b9b', fontSize: '15px', lineHeight: '24px' });

const section = css({ marginBottom: '32px' });

const sectionTitle = css({
  marginBottom: '12px',
  color: '#1f1c1c',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '28px',
});

const paragraph = css({ margin: '0', color: '#595555', lineHeight: '24px' });

const featureList = css({ margin: '0', padding: '0', listStyle: 'none' });

const featureItem = css({ padding: '8px 0', color: '#595555', lineHeight: '24px' });

const featureName = css({ color: '#1f1c1c', fontWeight: '600' });

const downloadLink = css({
  display: 'inline-block',
  marginTop: '12px',
  color: '#3db3f5',
  _hover: { color: '#54b5df' },
});

const Dollars: React.FC = () => {
  return (
    <>
      <Helmet title='Dollars 客户端' />
      <PageContainer>
        <div className={wrapper}>
          <h1 className={title}>Dollars 客户端</h1>
          <p className={intro}>
            Dollars 是 Bangumi 番组计划官方客户端，覆盖桌面端与移动端，随时随地记录你的追番日常。
          </p>

          <section className={section}>
            <h2 className={sectionTitle}>平台支持</h2>
            <p className={paragraph}>
              支持桌面端（Windows、macOS、Linux）与移动端（Android、iOS）等主流平台，
              跨设备同步你的收藏与进度。
            </p>
          </section>

          <section className={section}>
            <h2 className={sectionTitle}>核心功能</h2>
            <ul className={featureList}>
              {FEATURES.map((feature) => (
                <li className={featureItem} key={feature.title}>
                  <strong className={featureName}>{feature.title}</strong>：{feature.description}
                </li>
              ))}
            </ul>
          </section>

          <section className={section}>
            <h2 className={sectionTitle}>下载</h2>
            <p className={paragraph}>
              Dollars 客户端持续更新中，最新版本与下载地址请前往旧站查看。
            </p>
            <a
              className={downloadLink}
              href='https://bgm.tv/dollars'
              target='_blank'
              rel='noreferrer'
            >
              前往旧站查看下载与更新
            </a>
          </section>
        </div>
      </PageContainer>
    </>
  );
};

export default Dollars;
