import { cloneDeep, isArray, isNumber } from 'lodash-es';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Divider, Form, Input, Layout, Radio, Select } from '@bangumi/design';
import { Minus, Plus } from '@bangumi/icons';
import type { Wiki} from '@bangumi/utils';
import { parseWiki, stringifyWiki, WikiArrayItem , WikiItem } from '@bangumi/utils';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { _TEST_SUBJECTS_ } from '@bangumi/website/shared';

import WikiEditor from '../components/WikiEditor/WikiEditor';
import { useWikiContext } from '../wiki';
import style from './common.module.less';

const types = [
  { label: 'TV' },
  { label: 'WEB' },
  { label: 'OVA' },
  { label: '剧场版' },
  { label: '其它' },
];

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

const WikiEditDetailDetailPage: React.FC = () => {
  // const { id } = useParams();

  const { register, handleSubmit, setValue, getValues } = useForm();
  const id = _TEST_SUBJECTS_;
  const { subjectEditHistory } = useWikiContext();
  // console.log(subjectEditHistory);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // TODO: shim this into localStorage
  const [editorType, setEditorType] = useState(EditorType.Beginner);
  const [wiki, setWiki] = useState<Wiki>();
  const [wikiText, setWikiText] = useState(TEMPLATE);
  const instanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleSetEditorType = (type: EditorType) => {
    if (type === EditorType.Wiki) {
      setWikiText(stringifyWiki(wiki));
    } else if (type === EditorType.Beginner && instanceRef.current) {
      setWikiText(instanceRef.current.getValue());
    }
    setEditorType(type);
  };

  // useMemo
  useEffect(() => {
    setWiki(parseWiki(wikiText));
    console.log(wiki);
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
              <Input type='text' wrapperClass={style.formInput} {...register('subject.infobox')} />
            </Form.Item>

            <Form.Item label='类型'>
              <Radio.Group>
                {types.map((type, idx) => (
                  <Radio
                    id={type.label}
                    className={style.formRadio}
                    key={type.label}
                    label={type.label}
                    value={type.label}
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
                            key={`${subIdx}_${idx}`}
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

                {/* 不显示，只作为表单受控组件 */}
                <textarea hidden value={wikiText} {...register('subject.infobox')} />
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
                    setValue('commitMessage', value?.label);
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
        <>
          <div className={style.title}>条目修订历史</div>
          <Divider className={style.divider} />
        </>
      }
    />
  );
};

export default withErrorBoundary(WikiEditDetailDetailPage);
