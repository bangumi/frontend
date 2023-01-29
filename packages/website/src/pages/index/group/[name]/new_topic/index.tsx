import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { EditorForm, Input, Typography } from '@bangumi/design';
import { useGroup } from '@bangumi/website/hooks/use-group';

import GroupInfo from '../../components/GroupInfo';
import styles from './style.module.less';

const GroupNewTopicPage = () => {
  const { name } = useParams();
  const { group } = useGroup(name!);

  const [content, setContent] = useState('');

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.header}>
          <div className={styles.tipText}>
            <Typography.Text type='secondary'>
              在{' '}
              <Typography.Link to={`/group/${group.group.name}`} className={styles.groupLink}>
                {group.group.title}
              </Typography.Link>{' '}
              发表新话题
            </Typography.Text>
          </div>
          <div className={styles.titleInput}>
            <Input placeholder='取个标题……' />
          </div>
        </div>
        <div className={styles.contentEditor}>
          <EditorForm
            placeholder='话题正文……'
            content={content}
            onChange={setContent}
            hideCancel
            rows={15}
          />
        </div>
        <div className={styles.rightColumn}>
          <GroupInfo group={group.group} />
        </div>
      </div>
    </>
  );
};

export default GroupNewTopicPage;
