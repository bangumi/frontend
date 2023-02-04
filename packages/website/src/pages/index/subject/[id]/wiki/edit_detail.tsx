/* eslint-disable no-useless-return */
import cn from 'classnames';
import dayjs from 'dayjs';
import { cloneDeep, concat, filter, flow, isArray, isNumber, set } from 'lodash';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { nanoid } from 'nanoid';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { DraggableProvided, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLocalstorageState } from 'rooks';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Form, Input, Layout, Radio, Select, toast } from '@bangumi/design';
import { ArrowRightCircle, Cursor, Minus, Plus } from '@bangumi/icons';
import type { Wiki } from '@bangumi/utils';
import {
  fromWikiElement,
  mergeWiki,
  parseWiki,
  stringifyWiki,
  toWikiElement,
  WikiElement,
  WikiSyntaxError,
} from '@bangumi/utils';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import WikiEditor from '@bangumi/website/components/WikiEditor/WikiEditor';
import { getWikiTemplate, WikiEditTabsItemsByKey } from '@bangumi/website/shared/wiki';
import { reorder } from '@bangumi/website/utils';

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
  '',
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
].map((msg, idx) => ({ label: msg, value: idx.toString() }));

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
      className={cn(style.formDetailInfoItem, isArray(item.value) && style.draggableBox)}
      onKeyDown={(e) => {
        if (e.ctrlKey && e.key === 'Enter') {
          level === 1 && switchWikiElementToArray?.(index); /** 只对一级菜单有效 */
        }
        if (e.ctrlKey && e.code === 'KeyX') {
          removeOneWikiElement?.(path);
        }
      }}
      {...rest}
    >
      <Input.Group
        className={cn(style.formInputGroup, level === 2 && style.formInputGroupSecondary)}
        onKeyDown={(e) => {
          // 阻止回车提交表单
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <Input
          tabIndex={1} // 帮助在按 Tab 时能保证获取下一个 Input，不然下一个会 focus 到 <Cursor/>
          wrapperStyle={{
            width: '170px',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
          }}
          align={level === 2 ? 'right' : undefined}
          defaultValue={item.key}
          onChange={(v) => editOneWikiElement?.(path, 'key', v.target.value)}
        />
        <Input
          tabIndex={1}
          id={item._id}
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

const WikiBeginnerEditor = ({
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
                      className={style.draggableBox}
                      {...draggableProvided.draggableProps}
                    >
                      <WikiInfoItem
                        index={idx}
                        item={el}
                        level={level}
                        path={level === 1 ? idx.toString() : `${path}.${idx}`}
                        draggableProvided={draggableProvided}
                      />

                      {/* subList */}
                      {isArray(el.value) && (
                        <WikiBeginnerEditor
                          els={el.value}
                          level={level + 1}
                          onDragEnd={onDragEnd}
                          path={level === 1 ? idx.toString() : `${path}.${idx}`}
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
      <button
        className={cn(
          style.formInput,
          style.formInputBtn,
          level === 2 && style.formInputBtnSecondary,
        )}
        onClick={() => addOneWikiElement?.(path)}
        type='button'
      >
        <Plus />
        <span>新增行</span>
      </button>
    </DragDropContext>
  );
};

interface FormData {
  commitMessage: string;
  subject: ozaClient.SubjectEdit;
}

const WikiEditDetailDetailPage: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const prePlatform = watch('subject.platform');

  const [editorType, setEditorType] = useLocalstorageState(
    'chii_wiki_editor_type',
    EditorType.Beginner,
  );
  const wikiRef = useRef<Wiki>();
  const [wikiElement, setWikiElement] = useState<WikiElement[]>([]);

  const [inputFocusToId, setInputFocusToId] = useState('');
  useEffect(() => {
    const input = document.getElementById(inputFocusToId);
    if (input) {
      input.focus();
    }
    setInputFocusToId('');
  }, [inputFocusToId]);

  const monoEditorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { subjectEditHistory, subjectWikiInfo, mutateHistory, subjectId } = useWikiContext();

  useEffect(() => {
    wikiRef.current = parseWiki(subjectWikiInfo.infobox);
    monoEditorInstanceRef.current?.setValue(subjectWikiInfo.infobox);
    setWikiElement(toWikiElement(wikiRef.current));
    // https://github.com/bangumi/frontend/pull/312#discussion_r1086401410
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const text = monoEditorInstanceRef.current?.getValue() ?? '';
            parseWiki(text); /** check if text if valid */
            subject.infobox = text;
            break;
          }
          default:
            break;
        }
      } catch (error: unknown) {
        if (error instanceof WikiSyntaxError) {
          toast(error.message);
        }
        return;
      }
      ozaClient
        .putSubjectInfo(subjectId, {
          commitMessage,
          subject,
        })
        .then(async (err) => {
          if (err.status !== 200) {
            toast(err.data.message);
          } else {
            return mutateHistory();
          }
        })
        .then(() => {
          // TODO: jump to other path
          console.log('success');
        })
        .catch(() => {
          toast('提交失败，请稍后再试');
        });
    },
    [wikiElement, editorType, mutateHistory, subjectId],
  );

  const handleSetEditorType = (type: EditorType) => {
    if (editorType === type) return;
    setEditorType(type);
    switch (type) {
      case EditorType.Wiki:
        // 切换到 wiki 模式，序列化 wiki
        monoEditorInstanceRef.current?.setValue(
          stringifyWiki({
            type: wikiRef.current?.type ?? '',
            data: fromWikiElement(wikiElement),
          }),
        );
        break;
      case EditorType.Beginner: {
        // 切换到 入门模式，反序列化 wiki
        const text = monoEditorInstanceRef.current?.getValue() ?? '';
        try {
          const wiki = parseWiki(text);
          setWikiElement(toWikiElement(wiki));
          wikiRef.current && (wikiRef.current.type = wiki.type);
        } catch (error: unknown) {
          setEditorType(EditorType.Wiki);
          if (error instanceof WikiSyntaxError) {
            toast(error.message);
          }
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
      if (isNumber(idx) && !isNaN(idx)) {
        const preValue = newEls[idx]?.value as WikiElement[];
        return set(newEls, `${idx}.value`, concat(preValue, new WikiElement()));
      }
      return concat(preEls, new WikiElement());
    });
  };

  const removeOneWikiElement = (path: string) => {
    const [idx, subIdx] = path.split('.').map((v) => parseInt(v));
    const id = nanoid();
    if (!isNumber(idx)) return;
    setWikiElement((preEl) => {
      if (isNumber(subIdx)) {
        return preEl.map((el, i) => {
          if (i === idx && isArray(el.value)) {
            return {
              ...el,
              _id: id,
              value:
                el.value.length === 1
                  ? el.value[0]?.value
                  : filter(el.value, (_, i) => i !== subIdx),
            };
          }
          return el;
        });
      }
      return filter(preEl, (_, i) => i !== idx);
    });
    setInputFocusToId(id);
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
    const id = nanoid();
    setWikiElement((preEls) => {
      const newEls = [...preEls];
      return set(
        newEls,
        idx,
        new WikiElement({
          key: preEls[idx]?.key,
          value: [
            new WikiElement({
              id,
              value: preEls[idx]?.value ?? '',
            }),
          ],
        }),
      );
    });
    setInputFocusToId(id);
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

  const handlePlatformChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const tpl = e.target.dataset.tpl;
      const template = getWikiTemplate(subjectWikiInfo.typeID, tpl);
      try {
        const templateWiki = parseWiki(template);
        switch (editorType) {
          case EditorType.Beginner:
            setWikiElement((preEls) => {
              const preWiki = { type: wikiRef.current?.type ?? '', data: fromWikiElement(preEls) };
              return flow(mergeWiki(templateWiki), toWikiElement)(preWiki);
            });
            break;
          case EditorType.Wiki: {
            const text = flow(
              parseWiki,
              mergeWiki(templateWiki),
              stringifyWiki,
            )(monoEditorInstanceRef.current?.getValue() ?? '');
            monoEditorInstanceRef.current?.setValue(text);
            break;
          }
          default:
            break;
        }
      } catch (error: unknown) {
        if (error instanceof WikiSyntaxError) {
          toast(error.message);
        }
        console.error(error);
        setValue('subject.platform', prePlatform);
      }
    },
    [editorType, prePlatform, setValue, subjectWikiInfo.typeID],
  );

  return (
    <Layout
      type='alpha'
      leftChildren={
        <>
          <div className={style.title}>修改详细描述</div>
          <Divider className={style.divider} />
          <Form labelWidth={120} onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <Form.Item label='类别名'>
              <Input
                tabIndex={1}
                type='text'
                wrapperClass={style.formInput}
                defaultValue={subjectWikiInfo.name}
                {...register('subject.name', { required: true })}
              />
            </Form.Item>

            {subjectWikiInfo.availablePlatform.length && (
              <Form.Item label='类型'>
                <div className='flex-1'>
                  <Radio.Group>
                    {subjectWikiInfo.availablePlatform.map((type) => (
                      <Radio
                        id={type.text}
                        data-tpl={type.wiki_tpl}
                        className={style.formRadio}
                        key={type.id}
                        label={type.text}
                        value={type.id}
                        defaultChecked={subjectWikiInfo.platform === type.id}
                        {...register('subject.platform', {
                          required: true,
                          onChange: handlePlatformChange,
                        })}
                      />
                    ))}
                  </Radio.Group>
                  <div className={style.Tips}>
                    注意：切换类型会导致项目顺序发生变化，请先选择好模板再进行排序
                  </div>
                </div>
              </Form.Item>
            )}

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

                <div
                  className={style.Tips}
                  style={{ display: editorType === EditorType.Beginner ? 'block' : 'none' }}
                >
                  <div>Tips:</div>
                  <div>可拖拽改变行顺序</div>
                  <div>
                    按<kbd>Ctrl</kbd>+<kbd>Enter</kbd>切换为二级项目
                  </div>
                  <div>
                    按<kbd>Ctrl</kbd>+<kbd>X</kbd>可删除项目
                  </div>
                </div>

                {/* 入门编辑模式 */}
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
                    <WikiBeginnerEditor els={wikiElement} onDragEnd={onDragEnd} />
                  </WikiInfoContext.Provider>
                </div>

                {/* Wiki 编辑模式 */}
                <div hidden={editorType !== EditorType.Wiki}>
                  <WikiEditor instanceRef={monoEditorInstanceRef} />
                </div>
              </div>
            </Form.Item>

            <Form.Item label='剧情介绍'>
              <textarea
                tabIndex={1}
                className={style.formTextArea}
                defaultValue={subjectWikiInfo.summary}
                {...register('subject.summary', { required: true })}
              />
            </Form.Item>

            <Form.Item label='受限内容'>
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
                <Select
                  defaultValue='0'
                  options={BuiltInCommitMessage}
                  className={style.formSelect}
                  onChange={(value) => {
                    setValue('commitMessage', value?.label ?? '');
                  }}
                />
                <Input
                  tabIndex={1}
                  wrapperClass={style.formInput}
                  {...register('commitMessage', { required: true })}
                />
              </Input.Group>
            </Form.Item>

            <Button htmlType='submit' color='blue' className={style.formButton}>
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
            <Link
              to={WikiEditTabsItemsByKey.history.to(subjectId.toString())}
              className={style.historyMore}
            >
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
