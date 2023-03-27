import type { FC } from 'react';
import React from 'react';

import { ReactComponent as BangumiTextLogo } from '../../assets/logo.svg';
import style from './style.module.less';

interface IBlockItem {
  title: string;
  items: Array<{ key: string; label: string }>;
}

const FooterBlockItem: FC<{ block: IBlockItem }> = ({ block }) => {
  return (
    <div className={style.block}>
      <h2 className={style.title}>{block.title}</h2>
      {block.items.map(({ key, label }) => (
        <div key={key}>
          <a href={key}>{label}</a>
        </div>
      ))}
    </div>
  );
};

const aboutBlock: IBlockItem = {
  title: '关于我们',
  items: [
    {
      key: 'https://bgm.tv/about',
      label: '关于我们',
    },
    {
      key: 'https://bgm.tv/about/guideline',
      label: '社区指导原则',
    },
    {
      key: 'https://bgm.tv/about/copyright',
      label: '版权声明',
    },
    {
      key: 'https://bgm.tv/about/link2us',
      label: '链接我们',
    },
  ],
};

const helpBlock: IBlockItem = {
  title: '获得帮助',
  items: [
    {
      key: 'https://bgm.tv/help/bbcode',
      label: 'BBCode',
    },
    {
      key: 'https://bgm.tv/group/forum',
      label: '站务论坛',
    },
    {
      key: 'https://bgm.tv/group/wiki',
      label: '番組 WIKI 計画',
    },
    {
      key: 'https://bgm.tv/group/doujin',
      label: '天窗站务',
    },
  ],
};

const devBlock: IBlockItem = {
  title: '开发相关',
  items: [
    {
      key: 'https://bgm.tv/group/dev',
      label: '番组开发',
    },
    {
      key: 'https://bgm.tv/dev/app',
      label: '开发者平台',
    },
    {
      key: 'https://bgm.tv/group/issues',
      label: 'BUG 追踪',
    },
    {
      key: 'https://bgm.tv/onair',
      label: '客户端',
    },
  ],
};

const specialBlock: IBlockItem = {
  title: '特别推荐',
  items: [
    {
      key: 'https://bgm.tv/award/2021',
      label: 'Bangumi 年鉴',
    },
    {
      key: 'https://bgm.tv/magi',
      label: 'MAGI 问答',
    },
    {
      key: 'https://bgm.tv/tokei',
      label: 'etokei 绘时计',
    },
  ],
};

const moreBlock: IBlockItem = {
  title: '更多',
  items: [
    {
      key: 'https://bgm.tv/index',
      label: '目录',
    },
    {
      key: 'https://bgm.tv/wiki',
      label: '维基人',
    },
    {
      key: 'https://bgm.tv/goodies',
      label: '周边',
    },
    {
      key: 'https://bgm.tv/dollars',
      label: 'Dollars',
    },
  ],
};

const getThisYear = (): string => new Date().getFullYear().toString();

const Footer: FC = () => {
  const hash = import.meta.env.__COMMIT_HASH__ as string;
  return (
    <div className={style.footerContainer}>
      <div className={style.footerMain}>
        <div className={style.inner}>
          <div className={style.footerLeft}>
            <BangumiTextLogo className={style.logo} />
            <div className={style.copyright}>
              <p>© 2008-{getThisYear()} Bangumi (a.k.a.Chobits),</p>
              <p>
                some rights reserved | ver. {import.meta.env.__APP_VERSION__}
                {hash ? ' | ' + hash : ''}
              </p>
              <p>build at {import.meta.env.__BUILT_TIME__}</p>
            </div>
          </div>
          <div className={style.footerRight}>
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
