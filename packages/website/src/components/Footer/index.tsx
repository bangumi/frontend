import React, { FC } from 'react'
import { BangumiTextLogo } from '@bangumi/icons/musume'
import style from './style.module.less'

const FooterBlockItem: FC<{ title: string, items: Array<{ key: string, label: string }> }> = ({ title, items }) => {
  return (
    <div className={style.block}>
      <h2 className={style.title}>{title}</h2>
      {
        items.map(({ key, label }) => (
          <a key={key} href={key}>{label}</a>
        ))
      }
    </div>
  )
}

const AboutItems = [
  {
    key: '/about',
    label: '关于我们'
  },
  {
    key: '/about/guideline',
    label: '社区指导原则'
  },
  {
    key: '/about/copyright',
    label: '版权声明'
  },
  {
    key: '/about/link2us',
    label: '链接我们'
  }
]
const HelpItems = [
  {
    key: '/help/bbcode',
    label: 'BBCode'
  },
  {
    key: '/group/forum',
    label: '站务论坛'
  },
  {
    key: '/group/wiki',
    label: '番組 WIKI 計画'
  },
  {
    key: '/group/doujin',
    label: '天窗站务'
  }
]

const Footer: FC = () => {
  return (
    <div className={style.footerContainer}>
      <div className={style.footerMain}>
        <div className={style.inner}>
          <div className={style.footerLeft}>
            <BangumiTextLogo className={style.logo} />
          </div>
          <div className={style.footerRight}>
            <FooterBlockItem
              title="关于我们" items={AboutItems}
            />
            <FooterBlockItem
              title="获得帮助" items={HelpItems}
            />

            <FooterBlockItem
              title="关于我们" items={AboutItems}
            />
            <FooterBlockItem
              title="获得帮助" items={HelpItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
