import cn from 'classnames';
import dayjs from 'dayjs';
import { cloneDeep, isArray, isNumber } from 'lodash-es';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Form, Input, Layout, Radio, Select } from '@bangumi/design';
import { ArrowRightCircle, Minus, Plus } from '@bangumi/icons';
import type { Wiki } from '@bangumi/utils';
import { parseWiki, stringifyWiki, WikiArrayItem, WikiItem } from '@bangumi/utils';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { Link } from '@bangumi/website/components/Link';
import { _TEST_SUBJECTS_, WikiEditTabsItemsByKey } from '@bangumi/website/shared';

import WikiEditor from '../components/WikiEditor/WikiEditor';
import { useWikiContext } from '../wiki';
import style from './common.module.less';

enum EditorType {
  Beginner,
  Wiki,
}

const EditorTypeRadio = [
  {
    key: EditorType.Beginner,
    label: '入门编辑模式',
  },
  {
    key: EditorType.Wiki,
    label: 'Wiki 模式',
  },
];

const TEMPLATE = `{{Infobox animanga/TVAnime
|中文名= Bangumi Wiki 动画测试用沙盘
|别名={
[Wiki Sandbox]
}
|话数= 9
|放送开始= 1582-10-14
|放送星期= 星期九
|官方网站= https://bgm.tv/wiki
|播放电视台= Bangumi
|其他电视台= 
|播放结束= 2077-02-29
|其他= 
|Copyright= Bangumi
}}`;

const EMPTY_TEMPLATE = '';

const BuildInCommitMessage = [
  '新条目',
  '修饰语句',
  '修正笔误',
  '内容扩充',
  '排版',
  '段落章节',
  '分类',
  '小作品标签',
  '字词转换',
  '消歧义',
  '维基化',
  '标识删除',
  '侵权',
  '欢迎',
  '警告',
].map((msg, idx) => ({ label: msg, value: idx.toFixed() }));

const WikiInfoItem = ({
  item,
  isArray = false,
  handlePlus,
  handleMinus,
  onKeyUp,
  onKeyDown,
  handleKeyChange,
  handleValueChange,
}: {
  item?: Partial<WikiArrayItem & WikiItem>;
  isArray?: boolean;
  handlePlus?: () => void;
  handleMinus?: () => void;
  onKeyUp?: React.KeyboardEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  handleKeyChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleValueChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className={style.formDetailInfoItem} onKeyUp={onKeyUp} onKeyDown={onKeyDown}>
    <Input.Group className={style.formInputGroup}>
      <Input
        wrapperStyle={{
          width: '170px',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
        }}
        alight={isArray ? 'right' : undefined}
        defaultValue={isArray ? item?.k : item?.key}
        onChange={handleKeyChange}
      />
      <Input
        wrapperClass={style.formInput}
        defaultValue={isArray ? item?.v : item?.value}
        onChange={handleValueChange}
      />
    </Input.Group>

    <Minus className={style.formDetailInfoItemMinus} onClick={handleMinus} />

    <div className={style.formDetailInfoItemAdd}>
      <Plus className={style.formDetailInfoItemPlus} onClick={handlePlus} />
    </div>
  </div>
);

interface FormData {
  commitMessage: string;
  subject: ozaClient.SubjectEdit;
}

const WikiEditDetailDetailPage: React.FC = () => {
  // const { id } = useParams();

  const { register, handleSubmit, setValue, getValues } = useForm<FormData>();
  // TODO: shim this into localStorage
  const [editorType, setEditorType] = useState(EditorType.Beginner);
  const [wiki, setWiki] = useState<Wiki>();
  const [wikiText, setWikiText] = useState(TEMPLATE);
  const instanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const id = _TEST_SUBJECTS_;
  const { subjectEditHistory, subjectWikiInfo } = useWikiContext();

  const onSubmit = ({ commitMessage, subject }: FormData) => {
    switch (editorType) {
      case EditorType.Beginner:
        subject.infobox = stringifyWiki(wiki);
        break;
      case EditorType.Wiki:
        subject.infobox = instanceRef.current?.getValue() ?? '';
        break;
      default:
        break;
    }
    ozaClient
      .putSubjectInfo(_TEST_SUBJECTS_, {
        commitMessage,
        subject,
      })
      .then(() => {
        console.log('success');
      })
      .catch(() => {
        console.log('err');
      });
  };

  const handleSetEditorType = (type: EditorType) => {
    switch (editorType) {
      case EditorType.Wiki:
        // 切换到 wiki 模式，序列化 wiki
        setWikiText(stringifyWiki(wiki));
        break;
      case EditorType.Beginner: {
        // 切换到 入门模式，反序列化 wiki
        const text = instanceRef.current?.getValue() ?? '';
        try {
          setWiki(parseWiki(text));
        } catch (error: unknown) {
          console.log(error);
        }
        break;
      }
      default:
        break;
    }
    setEditorType(type);
  };

  // useMemo
  useEffect(() => {
    setWiki(parseWiki(wikiText));
  }, [wikiText]);

  const addOneWikiItem = (idx: number, subIdx?: number) => {
    setWiki((preWiki) => {
      if (preWiki) {
        const wikiData = cloneDeep(preWiki.data);
        if (wikiData[idx]?.array) {
          isNumber(subIdx) && wikiData[idx]?.values?.splice(subIdx + 1, 0, new WikiArrayItem());
        } else {
          wikiData.splice(idx + 1, 0, new WikiItem('', '', 'object'));
        }
        return {
          ...preWiki,
          data: wikiData,
        };
      }
    });
  };

  const removeOneWikiItem = (idx: number, subIdx?: number) => {
    setWiki((preWiki) => {
      if (preWiki) {
        const wikiData = cloneDeep(preWiki.data);
        const preWikiArrayData = wikiData[idx]?.values;
        if (isArray(preWikiArrayData)) {
          if (preWikiArrayData.length === 1) {
            wikiData[idx] = new WikiItem(wikiData[idx]!.key, '', 'object');
          }
          isNumber(subIdx) && preWikiArrayData.splice(subIdx, 1);
        } else {
          wikiData.splice(idx, 1);
        }
        return {
          ...preWiki,
          data: wikiData,
        };
      }
    });
  };

  const handleWikiItemEdit = (idx: number, value: string, target: 'key' | 'value') => {
    setWiki((preWiki) => {
      if (preWiki) {
        const wikiData = cloneDeep(preWiki.data);
        if (target === 'key') {
          wikiData[idx]!.key = value;
        } else if (target === 'value') {
          wikiData[idx]!.value = value;
        }
        return {
          ...preWiki,
          data: wikiData,
        };
      }
    });
  };

  const switchWikiItemToArray = (idx: number) => {
    setWiki((preWiki) => {
      if (preWiki) {
        const wikiData = cloneDeep(preWiki.data);
        wikiData[idx] = new WikiItem(wikiData[idx]!.key, '', 'array');
        wikiData[idx]!.values = [new WikiArrayItem()];
        return {
          ...preWiki,
          data: wikiData,
        };
      }
    });
  };

  return (
    <Layout
      type='alpha'
      leftChildren={
        <>
          <div className={style.title}>修改详细描述</div>
          <Divider className={style.divider} />
          <Form labelCol={120} onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <Form.Item label='类别名'>
              <Input type='text' wrapperClass={style.formInput} {...register('subject.name')} />
            </Form.Item>

            <Form.Item label='类型'>
              <Radio.Group>
                {subjectWikiInfo.availablePlatform.map((type, idx) => (
                  <Radio
                    id={type.text}
                    className={style.formRadio}
                    key={type.id}
                    label={type.text}
                    value={type.id}
                    defaultChecked={idx === 0}
                    {...register('subject.platform')}
                  />
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item label='描述信息'>
              <div className={style.formDetailInfo}>
                <Radio.Group>
                  {EditorTypeRadio.map((type) => (
                    <Radio
                      className={style.formRadio}
                      key={type.key}
                      name='editor_mode'
                      label={type.label}
                      onClick={() => handleSetEditorType(type.key)}
                      checked={editorType === type.key}
                      readOnly
                    />
                  ))}
                </Radio.Group>

                <div hidden={editorType !== EditorType.Beginner}>
                  {wiki?.data.map((item, idx) => (
                    // TODO: use nano id!
                    <div key={idx}>
                      <WikiInfoItem
                        item={item}
                        handlePlus={() => addOneWikiItem(idx)}
                        handleMinus={() => removeOneWikiItem(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            switchWikiItemToArray(idx);
                          }
                        }}
                        handleKeyChange={(v) => {
                          handleWikiItemEdit(idx, v.target.value, 'key');
                        }}
                        handleValueChange={(v) => {
                          handleWikiItemEdit(idx, v.target.value, 'value');
                        }}
                      />
                      {item.values?.map((subItem, subIdx) => {
                        return (
                          <WikiInfoItem
                            key={`${idx}_${subIdx}`}
                            item={subItem}
                            isArray
                            handlePlus={() => addOneWikiItem(idx, subIdx)}
                            handleMinus={() => removeOneWikiItem(idx, subIdx)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div hidden={editorType !== EditorType.Wiki}>
                  <WikiEditor defaultValue={wikiText} instanceRef={instanceRef} />
                </div>
              </div>
            </Form.Item>

            <Form.Item label='剧情介绍'>
              <textarea className={style.formTextArea} {...register('subject.summary')} />
            </Form.Item>

            <Form.Item label='受限内容'>
              {/* TODO: CheckBox */}
              <div className={style.formRadio}>
                <Radio
                  id='nsfw'
                  type='checkbox'
                  label='标记为受限内容'
                  {...register('subject.nsfw')}
                />
              </div>
            </Form.Item>

            <Form.Item label='编辑摘要'>
              <Input.Group className={style.formInputGroup}>
                {/* TODO: overflow here */}
                <Select
                  defaultValue='0'
                  options={BuildInCommitMessage}
                  style={{
                    width: '170px',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                  }}
                  onChange={(value) => {
                    setValue('commitMessage', value?.label ?? '');
                  }}
                />
                <Input wrapperClass={style.formInput} {...register('commitMessage')} />
              </Input.Group>
            </Form.Item>

            <Button htmlType='submit' shape='rounded' className={style.formButton}>
              提交修改
            </Button>
          </Form>
        </>
      }
      rightChildren={
        <div className='flex flex-col'>
          <div className={style.title}>条目修订历史</div>
          <Divider className={style.divider} />
          <div className={style.history}>
            {subjectEditHistory.map((his, idx) => (
              <div key={idx} className={style.historyItem}>
                <span className={style.historyUserName}>{his.creator.username}</span>
                <span className={style.historyMsg} title={his.commitMessage}>
                  {his.commitMessage}
                </span>
                <span className={cn(style.historySuffix, style.historyCreateAt)}>
                  @ {dayjs.unix(his.createdAt).format('YYYY-MM-DD HH:mm')}
                </span>
                <span className={style.historySuffix}>|</span>
                <span className={style.historySuffix}>恢复</span>
              </div>
            ))}
            <Link to={WikiEditTabsItemsByKey.history.to(id)} className={style.historyMore}>
              更多修改记录
              <ArrowRightCircle />
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default withErrorBoundary(WikiEditDetailDetailPage);
