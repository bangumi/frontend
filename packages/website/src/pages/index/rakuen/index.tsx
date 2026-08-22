import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { RaKuenTopicType } from '@bangumi/client/client.ts';
import { css, cx } from '@bangumi/styled-system/css';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';
import { useRakuenTopics } from '@bangumi/website/hooks/use-rakuen-topics.ts';

import RakuenList from './components/RakuenList.tsx';

const pageHeader = css({
  padding: '0 0 12px',
  '& h1': {
    display: 'inline',
    margin: '0',
    color: '#1f1c1c',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  '& p': {
    margin: '6px 0 0',
    color: '#595555',
    fontSize: '12px',
  },
});

const tabs = css({
  display: 'flex',
  gap: '4px',
  padding: '0',
  margin: '0 0 12px',
  listStyle: 'none',
  borderBottom: '1px solid #e8e3e3',
  overflowX: 'auto',
});

const tab = css({
  display: 'block',
  padding: '8px 12px',
  marginBottom: '-1px',
  color: '#595555',
  fontSize: '13px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  borderBottom: '2px solid transparent',
  _hover: { color: '#0084b4' },
});

const tabActive = css({
  color: '#0084b4',
  borderBottomColor: '#0084b4',
});

const content = css({
  border: '1px solid #e8e3e3',
  borderRadius: '6px',
});

const TABS: { type: RaKuenTopicType; label: string }[] = [
  { type: RaKuenTopicType.All, label: '全部' },
  { type: RaKuenTopicType.Group, label: '小组' },
  { type: RaKuenTopicType.MyGroup, label: '已加入小组' },
  { type: RaKuenTopicType.Subject, label: '条目' },
  { type: RaKuenTopicType.Episode, label: '章节' },
  { type: RaKuenTopicType.Character, label: '角色' },
  { type: RaKuenTopicType.Person, label: '人物' },
];

/** URL query 中的字符串 type 转枚举，非法值回退到 all */
function parseType(param: string | null): RaKuenTopicType {
  const found = TABS.find((tab) => tab.type === param);
  return found?.type ?? RaKuenTopicType.All;
}

const RakuenIndex: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = parseType(searchParams.get('type'));

  const { data: topics } = useRakuenTopics(type);

  return (
    <>
      <Helmet title='超展开' />
      <PageContainer>
        <div className={pageHeader}>
          <h1>超展开</h1>
          <p>汇聚 Bangumi 全站讨论</p>
        </div>
        <ul className={tabs} role='tablist'>
          {TABS.map((item) => (
            <li key={item.type} role='presentation'>
              <Link
                to={item.type === RaKuenTopicType.All ? '/rakuen' : `/rakuen?type=${item.type}`}
                className={cx(tab, item.type === type && tabActive)}
                role='tab'
                aria-selected={item.type === type}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={content}>
          <RakuenList topics={topics ?? []} />
        </div>
      </PageContainer>
    </>
  );
};

export default withErrorBoundary(RakuenIndex);
