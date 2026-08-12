import React from 'react';
import { NavLink } from 'react-router-dom';

import { css, cx } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';

interface AboutNavItem {
  to: string;
  label: string;
  end?: boolean;
}

const ABOUT_NAV_ITEMS: AboutNavItem[] = [
  { to: '/about', label: '关于本站', end: true },
  { to: '/about/guideline', label: '社区指导原则' },
  { to: '/about/copyright', label: '版权声明' },
  { to: '/about/link2us', label: '链接我们' },
];

export const aboutContent = css({ maxWidth: '700px', margin: '0 auto' });

const nav = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '24px',
  marginBottom: '32px',
  paddingBottom: '16px',
  borderBottom: '1px solid #e8e3e3',
});

const navLink = css({
  color: '#595555',
  fontSize: '14px',
  textDecoration: 'none',
  _hover: { color: '#54b5df' },
});

const active = css({ color: '#3db3f5', fontWeight: '600' });

export const aboutTitle = css({
  margin: '0 0 16px',
  color: '#1f1c1c',
  fontSize: '26px',
  fontWeight: '600',
});

export const aboutSection = css({ marginBottom: '28px' });

export const aboutSectionTitle = css({
  margin: '0 0 12px',
  color: '#1f1c1c',
  fontSize: '18px',
  fontWeight: '600',
});

export const aboutParagraph = css({
  margin: '0 0 12px',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.8',
});

export const aboutList = css({ margin: '0', paddingLeft: '20px' });

export const aboutListItem = css({
  marginBottom: '10px',
  color: '#595555',
  fontSize: '14px',
  lineHeight: '1.8',
});

export const inlineLink = css({
  color: '#3db3f5',
  textDecoration: 'none',
  wordBreak: 'break-all',
  _hover: { textDecoration: 'underline' },
});

export const AboutNav: React.FC = () => (
  <nav className={nav}>
    {ABOUT_NAV_ITEMS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        className={({ isActive }) => cx(navLink, isActive && active)}
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

const About: React.FC = () => (
  <>
    <Helmet title='关于本站' />
    <PageContainer as='main'>
      <div className={aboutContent}>
        <AboutNav />
        <h1 className={aboutTitle}>关于本站</h1>
        <p className={aboutParagraph}>
          Bangumi（番组计划）是一个以 ACG（动画、漫画、游戏）为主题的综合性社区网站，创立于 2008
          年。
          在这里，你可以记录自己看过、读过、玩过的作品，也可以和同好一起交流讨论，分享自己的见闻与感想。
        </p>
        <section className={aboutSection}>
          <h2 className={aboutSectionTitle}>核心功能</h2>
          <ul className={aboutList}>
            <li className={aboutListItem}>
              条目资料库：收录动画、漫画、游戏、音乐等 ACG
              条目，以及人物、角色与声优信息，并支持社区成员共同编辑补充。
            </li>
            <li className={aboutListItem}>
              收藏管理：通过「想看 / 在看 / 看过」等方式记录追番、阅读与游玩进度，随时回顾自己的 ACG
              历程。
            </li>
            <li className={aboutListItem}>
              兴趣小组：围绕作品、类型或话题创建和加入小组，和同好分享心得、组织活动。
            </li>
            <li className={aboutListItem}>
              日志与吐槽：撰写日志记录长篇感想，也可以在条目和章节下随手记录吐槽。
            </li>
          </ul>
        </section>
      </div>
    </PageContainer>
  </>
);

export default About;
