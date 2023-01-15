/* eslint-disable no-useless-return */
import cn from 'classnames';
import dayjs from 'dayjs';
import { cloneDeep, concat, filter, isArray, isNumber, set } from 'lodash-es';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { DraggableProvided, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useLocalstorageState } from 'rooks';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Form, Input, Layout, Radio, Select } from '@bangumi/design';
import { ArrowRightCircle, Cursor, Minus } from '@bangumi/icons';
import type { Wiki } from '@bangumi/utils';
import {
  fromWikiElement,
  parseWiki,
  stringifyWiki,
  toWikiElement,
  WikiElement,
} from '@bangumi/utils';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { Link } from '@bangumi/website/components/Link';
import { WikiEditTabsItemsByKey } from '@bangumi/website/shared';
import { reorder } from '@bangumi/website/utils';

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

const BuiltInCommitMessage = [
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

type WikiInfoItemProps = JSX.IntrinsicElements['div'] & {
  index: number;
  item: WikiElement;
  path: string;
  level?: number;
  draggableProvided: DraggableProvided;
};

interface IWikiInfoContext {
  els: WikiElement[];
  addOneWikiElement: (path: string) => void;
  removeOneWikiElement: (path: string) => void;
  editOneWikiElement: (path: string, target: 'value' | 'key', value: string) => void;
  switchWikiElementToArray: (idx: number) => void;
}

const WikiInfoContext = createContext<IWikiInfoContext | null>(null);

const WikiInfoItem = ({
  item,
  level = 1,
  draggableProvided,
  path,
  index,
  ...rest
}: WikiInfoItemProps) => {
  const { editOneWikiElement, removeOneWikiElement, switchWikiElementToArray } =
    useContext(WikiInfoContext) ?? {};
  return (
    <div
      className={style.formDetailInfoItem}
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          level === 1 && switchWikiElementToArray?.(index); /** 只对一级菜单有效 */
        }
      }}
      {...rest}
    >
      <Input.Group
        className={cn(style.formInputGroup, level === 2 && style.formInputGroupSecondary)}
      >
        <Input
          wrapperStyle={{
            width: '170px',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
          }}
          alight={level === 2 ? 'right' : undefined}
          defaultValue={item.key}
          onChange={(v) => editOneWikiElement?.(path, 'key', v.target.value)}
        />
        <Input
          wrapperClass={style.formInput}
          defaultValue={typeof item.value === 'string' ? item.value : ''}
          disabled={isArray(item.value)}
          onChange={(v) => editOneWikiElement?.(path, 'value', v.target.value)}
        />
      </Input.Group>

      <div {...draggableProvided.dragHandleProps}>
        <Cursor className={style.formDetailInfoItemCursor} />
      </div>
      <Minus
        className={style.formDetailInfoItemMinus}
        onClick={() => removeOneWikiElement?.(path)}
      />
    </div>
  );
};

const WikiInfoList = ({
  els,
  level = 1,
  path = '',
  onDragEnd,
}: {
  els: WikiElement[];
  level?: number;
  path?: string;
  onDragEnd: (path: string, result: DropResult, provided: ResponderProvided) => void;
}) => {
  const { addOneWikiElement } = useContext(WikiInfoContext) ?? {};

  return (
    <DragDropContext onDragEnd={(res, provided) => onDragEnd(path, res, provided)}>
      <Droppable droppableId={`list-${level}`}>
        {(droppableProvided) => (
          <div ref={droppableProvided.innerRef}>
            {els.map((el, idx) => {
              return (
                <Draggable key={el._id} index={idx} draggableId={el._id}>
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      style={{
                        ...draggableProvided.draggableProps.style,
                        marginBottom: '0.625rem',
                      }}
                    >
                      <WikiInfoItem
                        index={idx}
                        item={el}
                        level={level}
                        path={level === 1 ? idx.toFixed() : `${path}.${idx}`}
                        draggableProvided={draggableProvided}
                        style={{
                          marginBottom: isArray(el.value) ? '0.625rem' : '',
                        }}
                      />

                      {/* subList */}
                      {isArray(el.value) && (
                        <WikiInfoList
                          els={el.value}
                          level={level + 1}
                          onDragEnd={onDragEnd}
                          path={level === 1 ? idx.toFixed() : `${path}.${idx}`}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      <Input
        type='button'
        value='新增行'
        wrapperClass={cn(style.formInput, style.formInputBtn)}
        onClick={() => addOneWikiElement?.(path)}
      />
    </DragDropContext>
  );
};

interface FormData {
  commitMessage: string;
  subject: ozaClient.SubjectEdit;
}

const WikiEditDetailDetailPage: React.FC = () => {
  const { id: subjectId } = useParams();

  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [editorType, setEditorType] = useLocalstorageState(
    'chii_wiki_editor_type',
    EditorType.Beginner,
  );
  const wikiRef = useRef<Wiki>();
  const [wikiElement, setWikiElement] = useState<WikiElement[]>([]);
  const instanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { subjectEditHistory, subjectWikiInfo, mutateHistory } = useWikiContext();

  useEffect(() => {
    wikiRef.current = parseWiki(subjectWikiInfo.infobox);
    instanceRef.current?.setValue(subjectWikiInfo.infobox);
    setWikiElement(toWikiElement(wikiRef.current));
  }, []);

  const onSubmit = useCallback(
    ({ commitMessage, subject }: FormData) => {
      try {
        switch (editorType) {
          case EditorType.Beginner:
            subject.infobox = stringifyWiki({
              type: wikiRef.current?.type ?? '',
              data: fromWikiElement(wikiElement),
            });
            break;
          case EditorType.Wiki: {
            // TODO: check valid
            const text = instanceRef.current?.getValue() ?? '';
            parseWiki(text);
            subject.infobox = text;
            break;
          }
          default:
            break;
        }
      } catch (error: unknown) {
        // TODO: notify
        console.error(error);
        return;
      }
      ozaClient
        .putSubjectInfo(parseInt(subjectId!), {
          commitMessage,
          subject,
        })
        .then(async () => mutateHistory())
        .then(() => {
          console.log('success');
        })
        .catch(() => {
          console.log('err');
        });
    },
    [wikiElement, editorType],
  );

  const handleSetEditorType = (type: EditorType) => {
    if (editorType === type) return;
    setEditorType(type);
    switch (type) {
      case EditorType.Wiki:
        // 切换到 wiki 模式，序列化 wiki
        instanceRef.current?.setValue(
          stringifyWiki({
            type: wikiRef.current?.type ?? '',
            data: fromWikiElement(wikiElement),
          }),
        );
        break;
      case EditorType.Beginner: {
        // 切换到 入门模式，反序列化 wiki
        const text = instanceRef.current?.getValue() ?? '';
        try {
          const wiki = parseWiki(text);
          setWikiElement(toWikiElement(wiki));
          wikiRef.current && (wikiRef.current.type = wiki.type);
        } catch (error: unknown) {
          setEditorType(EditorType.Wiki);
          // TODO: notify
          console.log(error);
        }
        break;
      }
      default:
        break;
    }
  };

  const addOneWikiElement = (path: string) => {
    const [idx] = path.split('.').map((v) => parseInt(v));
    setWikiElement((preEls) => {
      const newEls = cloneDeep(preEls);
      if (!isNaN(idx) && isNumber(idx)) {
        const preValue = newEls[idx]?.value as WikiElement[];
        return set(newEls, `${idx}.value`, concat(preValue, new WikiElement()));
      }
      return concat(preEls, new WikiElement());
    });
  };

  const removeOneWikiElement = (path: string) => {
    const [idx, subIdx] = path.split('.').map((v) => parseInt(v));
    if (!isNumber(idx)) return;
    setWikiElement((preEl) => {
      if (isNumber(subIdx)) {
        return preEl.map((el, i) => {
          if (i === idx && isArray(el.value)) {
            return {
              ...el,
              value: el.value.length === 1 ? undefined : filter(el.value, (_, i) => i !== subIdx),
            };
          }
          return el;
        });
      }
      return filter(preEl, (_, i) => i !== idx);
    });
  };

  const editOneWikiElement = (path: string, target: 'key' | 'value', value: string) => {
    const [idx, subIdx] = path.split('.').map((v) => parseInt(v));
    if (!isNumber(idx)) return;
    setWikiElement((preEls) => {
      if (isNumber(subIdx)) {
        return set(preEls, `${idx}.value.${subIdx}.${target}`, value);
      }
      return set(preEls, `${idx}.${target}`, value);
    });
  };

  const switchWikiElementToArray = (idx: number) => {
    setWikiElement((preEls) => {
      const newEls = [...preEls];
      return set(
        newEls,
        idx,
        new WikiElement({ key: preEls[idx]?.key, value: [new WikiElement()] }),
      );
    });
  };

  const onDragEnd = (path: string, result: DropResult, provided: ResponderProvided) => {
    const { destination, source } = result;
    const [idx] = path.split('.').map((v) => parseInt(v));
    if (!destination) return;
    const level = parseInt(source.droppableId.split('-')[1] ?? '-1');
    if (level === 1) {
      setWikiElement((preEls) => reorder(preEls, source.index, destination.index));
    } else if (level === 2 && isNumber(idx)) {
      setWikiElement((preEls) =>
        preEls.map((el, i) => {
          if (i === idx && isArray(el.value)) {
            return {
              ...el,
              value: reorder(el.value, source.index, destination.index),
            };
          }
          return el;
        }),
      );
    }
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
              <Input
                type='text'
                wrapperClass={style.formInput}
                defaultValue={subjectWikiInfo.name}
                {...register('subject.name', { required: true })}
              />
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
                    defaultChecked={subjectWikiInfo.platform === type.id}
                    {...register('subject.platform', { required: true })}
                  />
                ))}
              </Radio.Group>
            </Form.Item>

            {/* TODO: 提醒 Tab 可以切换 */}
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
                  <WikiInfoContext.Provider
                    value={{
                      els: wikiElement,
                      addOneWikiElement,
                      removeOneWikiElement,
                      editOneWikiElement,
                      switchWikiElementToArray,
                    }}
                  >
                    <WikiInfoList els={wikiElement} onDragEnd={onDragEnd} />
                  </WikiInfoContext.Provider>
                </div>

                <div hidden={editorType !== EditorType.Wiki}>
                  <WikiEditor instanceRef={instanceRef} />
                </div>
              </div>
            </Form.Item>

            <Form.Item label='剧情介绍'>
              <textarea
                className={style.formTextArea}
                defaultValue={subjectWikiInfo.summary}
                {...register('subject.summary', { required: true })}
              />
            </Form.Item>

            <Form.Item label='受限内容'>
              {/* TODO: CheckBox */}
              <div className={style.formRadio}>
                <Radio
                  id='nsfw'
                  type='checkbox'
                  label='标记为受限内容'
                  defaultChecked={subjectWikiInfo.nsfw}
                  {...register('subject.nsfw')}
                />
              </div>
            </Form.Item>

            <Form.Item label='编辑摘要'>
              <Input.Group className={style.formInputGroup}>
                {/* TODO: overflow here */}
                <Select
                  defaultValue='0'
                  options={BuiltInCommitMessage}
                  style={{
                    width: '170px',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                  }}
                  onChange={(value) => {
                    setValue('commitMessage', value?.label ?? '');
                  }}
                />
                <Input
                  wrapperClass={style.formInput}
                  {...register('commitMessage', { required: true })}
                />
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
            {/* TODO: dashed here! */}
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
            <Link to={WikiEditTabsItemsByKey.history.to(subjectId)} className={style.historyMore}>
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
