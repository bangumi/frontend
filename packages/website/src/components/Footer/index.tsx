import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { css } from '@bangumi/styled-system/css';

/* 与原站 #footer / #footerLinks 对齐：浅灰链接带 + 灰色版权行 */
const footerContainer = css({
  margin: '20px 0 15px 0',
  padding: '0',
  color: 'bgmFooterText',
});

const footerLinks = css({
  background: 'bgmFooterBg',
  borderTop: '1px solid token(colors.bgmBorder)',
  padding: '15px 10px',
  smDown: { padding: '10px 0' },
});

const footerLinksInner = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  maxWidth: '1200px',
  margin: '0 auto',
});

const footerBlock = css({
  '& dt': {
    margin: '0 15px 3px',
    paddingBottom: '3px',
    fontSize: '12px',
    fontWeight: '700',
    borderBottom: '1px solid token(colors.bgmBorderMedium)',
  },
  '& dd': {
    margin: '0 15px 3px',
  },
  /* 链接继承原站全局 a 样式（#444 / hover #02A3FB 无下划线），不单独覆盖 */
});

/* copyright 与正文同宽（原站 #footer .copyright 在 1200px 内容区内） */
const copyright = css({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '10px 10px 0',
  fontSize: '10px',
  color: 'bgmTextTip',
  '& p': { margin: '0' },
  smDown: { padding: '10px 10px 0' },
});

interface FooterLink {
  href: string;
  label: string;
}

interface FooterBlock {
  title: string;
  /** 每个子数组渲染为一行，行内多个链接用「 | 」连接（与原站年鉴链接行一致） */
  rows: FooterLink[][];
}

const footerBlocks: FooterBlock[] = [
  {
    title: '关于我们',
    rows: [
      [{ href: '/about', label: '关于我们' }],
      [{ href: '/about/guideline', label: '社区指导原则' }],
      [{ href: '/about/copyright', label: '版权声明' }],
      [{ href: '/about/link2us', label: '链接我们' }],
    ],
  },
  {
    title: '获取帮助',
    rows: [
      [{ href: '/help/bbcode', label: 'BBCode' }],
      [{ href: '/group/forum', label: '站务论坛' }],
      [{ href: '/group/dev', label: '番组开发' }],
      [{ href: '/group/issues', label: 'BUG 追踪' }],
      [{ href: '/group/doujin', label: '天窗站务' }],
    ],
  },
  {
    title: '特别推荐',
    rows: [
      [
        { href: '/award/2025', label: '年鉴 2025' },
        { href: '/award/2024', label: '24' },
        { href: '/award/2023', label: '23' },
        { href: '/award/2022', label: '22' },
        { href: '/award/2021', label: '21' },
        { href: '/award/2020', label: '20' },
        { href: '/award/2019', label: '19' },
        { href: '/award/2018', label: '18' },
        { href: '/award/2017', label: '17' },
        { href: '/award/2016', label: '16' },
        { href: '/award/2015', label: '15' },
        { href: '/award/2014', label: '14' },
        { href: '/award/2013', label: '13' },
        { href: '/award/2012', label: '12' },
        { href: '/award/2011', label: '11' },
        { href: '/award/2010', label: '10' },
      ],
      [
        { href: '/award/2025/winner', label: 'TBA 2025' },
        { href: '/award/2024/winner', label: '24' },
      ],
      [{ href: '/group/wiki', label: '番組 WIKI 計画' }],
      [{ href: '/onair', label: 'onAir 客户端' }],
      [{ href: '/tokei', label: 'etokei 绘时计' }],
    ],
  },
  {
    title: '更多',
    rows: [
      [{ href: '/dev/app', label: '开发者平台' }],
      [{ href: '/index', label: '目录' }],
      [{ href: '/wiki', label: '维基人' }],
      [{ href: '/magi', label: 'MAGI 问答' }],
      [{ href: '/goodies', label: '周边' }],
      [{ href: '/dollars', label: 'Dollars' }],
    ],
  },
];

const getThisYear = (): string => new Date().getFullYear().toString();

const Footer: FC = () => {
  const hash = import.meta.env.__COMMIT_HASH__ as string;
  return (
    <footer className={footerContainer}>
      <div className={footerLinks}>
        <div className={footerLinksInner}>
          {footerBlocks.map((block) => (
            <dl className={footerBlock} key={block.title}>
              <dt>{block.title}</dt>
              {block.rows.map((row, rowIndex) => (
                <dd key={rowIndex}>
                  {row.map((link, linkIndex) => (
                    <React.Fragment key={link.href}>
                      {linkIndex > 0 && ' | '}
                      <Link to={link.href}>{link.label}</Link>
                    </React.Fragment>
                  ))}
                </dd>
              ))}
            </dl>
          ))}
        </div>
      </div>
      <div className={copyright}>
        <p>
          © 2008-{getThisYear()} Bangumi (a.k.a.Chobits), some rights reserved | ver.{' '}
          {import.meta.env.__APP_VERSION__}
          {hash ? ` | ${hash}` : ''} | build at {import.meta.env.__BUILT_TIME__}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
