import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { css } from '@bangumi/styled-system/css';

import footerCover from '../../assets/footer-cover.png';
import { ReactComponent as BangumiTextLogo } from '../../assets/logo.svg';

const footerContainer = css({
  display: 'flex',
  alignItems: 'center',
  height: '220px',
  /* 左右无限延生的纯色 */
  _before: {
    content: '""',
    height: '100%',
    flex: '1',
    backgroundColor: '#f29ba3',
  },
  _after: {
    content: '""',
    height: '100%',
    flex: '1',
    backgroundColor: '#f64b51',
  },
  '@media screen and (max-width: 768px)': {
    height: '160px',
  },
});

const footerMain = css({
  boxSizing: 'border-box',
  width: '1260px',
  height: '100%',
  backgroundColor: '#f47a81', // Fallback background color
  backgroundImage: 'var(--footer-cover)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  padding: '0 30px',
  fontSize: '14px',
  _before: {
    content: '""',
    position: 'absolute',
    width: '116px',
    height: '100%',
    left: '0',
    top: '0',
    background: 'linear-gradient(270deg, #f29ba3 41.38%, rgba(242, 155, 163, 0) 85.34%)',
    transform: 'rotate(-180deg)',
  },
  _after: {
    content: '""',
    position: 'absolute',
    width: '116px',
    height: '100%',
    right: '0',
    top: '0',
    background: 'linear-gradient(270deg, #f64b51 0%, rgba(246, 75, 81, 0) 100%)',
  },
  '@media screen and (max-width: 768px)': {
    padding: '0 8px',
    fontSize: '11px',
  },
});

const inner = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
});

const footerLeft = css({
  zIndex: '1',
  '@media screen and (max-width: 768px)': {
    display: 'none',
  },
});

const logo = css({
  width: '186px',
  height: '55px',
  marginBottom: '38px',
  '& path': {
    fill: '#fff',
    stroke: '#fff',
  },
  '@media screen and (max-width: 992px)': {
    marginBottom: '0',
    width: '160px',
  },
});

const copyright = css({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '1em',
  lineHeight: '16px',
  color: 'rgba(255, 255, 255, 0.4)',
  '& p': { margin: '0' },
  '@media screen and (max-width: 992px)': {
    display: 'none',
  },
});

const footerRight = css({
  display: 'flex',
  alignItems: 'center',
  zIndex: '1',
  '@media screen and (max-width: 768px)': {
    justifyContent: 'space-around',
    width: '100%',
  },
});

const footerBlock = css({
  textAlign: 'right',
  width: '160px',
  flex: 'none',
  order: '0',
  alignSelf: 'stretch',
  flexGrow: '0',
  margin: '9px 0',
  '& div': {
    marginBottom: '9px',
    '&:last-of-type': { marginBottom: '0' },
    '& a': {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: '400',
      fontSize: '1em',
      lineHeight: '21px',
      _hover: {
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
      },
    },
  },
  '@media screen and (max-width: 1200px)': {
    width: '130px',
  },
  '@media screen and (max-width: 992px)': {
    width: '106px',
  },
  '@media screen and (max-width: 768px)': {
    textAlign: 'left',
    width: 'auto',
    '& div': { marginBottom: '2px' },
  },
});

const blockTitle = css({
  color: '#fff6f7',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '1em',
  lineHeight: '20px',
  marginTop: '0',
  marginBottom: '9px',
});

interface IBlockItem {
  title: string;
  items: Array<{ key: string; label: string }>;
}

const FooterBlockItem: FC<{ block: IBlockItem }> = ({ block }) => {
  return (
    <div className={footerBlock}>
      <h2 className={blockTitle}>{block.title}</h2>
      {block.items.map(({ key, label }) => (
        <div key={key}>
          <Link to={key}>{label}</Link>
        </div>
      ))}
    </div>
  );
};

const aboutBlock: IBlockItem = {
  title: '关于我们',
  items: [
    {
      key: '/about',
      label: '关于我们',
    },
    {
      key: '/about/guideline',
      label: '社区指导原则',
    },
    {
      key: '/about/copyright',
      label: '版权声明',
    },
    {
      key: '/about/link2us',
      label: '链接我们',
    },
  ],
};

const helpBlock: IBlockItem = {
  title: '获得帮助',
  items: [
    {
      key: '/help/bbcode',
      label: 'BBCode',
    },
    {
      key: '/group/forum',
      label: '站务论坛',
    },
    {
      key: '/group/wiki',
      label: '番組 WIKI 計画',
    },
    {
      key: '/group/doujin',
      label: '天窗站务',
    },
  ],
};

const devBlock: IBlockItem = {
  title: '开发相关',
  items: [
    {
      key: '/group/dev',
      label: '番组开发',
    },
    {
      key: '/dev/app',
      label: '开发者平台',
    },
    {
      key: '/group/issues',
      label: 'BUG 追踪',
    },
    {
      key: '/onair',
      label: '客户端',
    },
  ],
};

const specialBlock: IBlockItem = {
  title: '特别推荐',
  items: [
    {
      key: '/award/2021',
      label: 'Bangumi 年鉴',
    },
    {
      key: '/magi',
      label: 'MAGI 问答',
    },
    {
      key: '/tokei',
      label: 'etokei 绘时计',
    },
  ],
};

const moreBlock: IBlockItem = {
  title: '更多',
  items: [
    {
      key: '/index',
      label: '目录',
    },
    {
      key: '/wiki',
      label: '维基人',
    },
    {
      key: '/goodies',
      label: '周边',
    },
    {
      key: '/dollars',
      label: 'Dollars',
    },
  ],
};

const getThisYear = (): string => new Date().getFullYear().toString();

const Footer: FC = () => {
  const hash = import.meta.env.__COMMIT_HASH__ as string;
  return (
    <div className={footerContainer}>
      <div
        className={footerMain}
        style={{ '--footer-cover': `url(${footerCover})` } as React.CSSProperties}
      >
        <div className={inner}>
          <div className={footerLeft}>
            <BangumiTextLogo className={logo} />
            <div className={copyright}>
              <p>© 2008-{getThisYear()} Bangumi (a.k.a.Chobits),</p>
              <p>
                some rights reserved | ver. {import.meta.env.__APP_VERSION__}
                {hash ? ' | ' + hash : ''}
              </p>
              <p>build at {import.meta.env.__BUILT_TIME__}</p>
            </div>
          </div>
          <div className={footerRight}>
            <FooterBlockItem block={aboutBlock} />
            <FooterBlockItem block={helpBlock} />

            <FooterBlockItem block={devBlock} />
            <FooterBlockItem block={specialBlock} />
            <FooterBlockItem block={moreBlock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
