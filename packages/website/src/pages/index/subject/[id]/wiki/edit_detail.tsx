import dayjs from 'dayjs';
import { flow } from 'lodash-es';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalstorageState } from 'rooks';

import { ozaClient } from '@bangumi/client/index.ts';
import {
  Button,
  Divider,
  Form,
  Input,
  Layout,
  Radio,
  Select,
  toast,
} from '@bangumi/design/index.tsx';
import { ArrowRightCircle } from '@bangumi/icons/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';
import type { Wiki, WikiElement } from '@bangumi/utils/index.ts';
import {
  fromWikiElement,
  mergeWiki,
  parseWiki,
  stringifyWiki,
  toWikiElement,
  WikiSyntaxError,
} from '@bangumi/utils/index.ts';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import WikiEditor from '@bangumi/website/components/WikiEditor/WikiEditor.tsx';
import WikiBeginnerEditor from '@bangumi/website/pages/index/subject/[id]/components/WikiBeginnerEditor.tsx';
import { useWikiContext } from '@bangumi/website/pages/index/subject/[id]/wiki.tsx';
import { getWikiTemplate, WikiEditTabsItemsByKey } from '@bangumi/website/shared/wiki.ts';

import {
  divider,
  editorHandbook,
  editorHandbookContent,
  form,
  formButton,
  formDetailInfo,
  formInput,
  formInputGroup,
  formRadio,
  formSelect,
  formTextArea,
  history,
  historyCreateAt,
  historyItem,
  historyMore,
  historyMsg,
  historySuffix,
  historyUserName,
  tips,
  title,
} from './common.ts';

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

const flexColumn = css({ display: 'flex', flexDirection: 'column' });
const flexOne = css({ flex: '1' });

interface FormData {
  commitMessage: string;
  subject: ozaClient.SubjectEdit;
}

const formatWikiSyntaxErrorMessage = (error: WikiSyntaxError): string => {
  return `${error.lino ? `line ${error.lino}:` : ''} ${error.message}`;
};

function WikiEditDetailDetailPage() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const prePlatform = watch('subject.platform');

  const [editorType, setEditorType] = useLocalstorageState(
    'chii_wiki_editor_type',
    EditorType.Beginner,
  );
  const wikiRef = useRef<Wiki | null>(null);
  const [wikiElement, setWikiElement] = useState<WikiElement[]>([]);

  const monoEditorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { subjectEditHistory, subjectWikiInfo, mutateHistory, subjectId } = useWikiContext();

  useEffect(() => {
    wikiRef.current = parseWiki(subjectWikiInfo.infobox);
    monoEditorInstanceRef.current?.setValue(subjectWikiInfo.infobox);
    setWikiElement(toWikiElement(wikiRef.current));
    // https://github.com/bangumi/frontend/pull/312#discussion_r1086401410
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
          toast(formatWikiSyntaxErrorMessage(error));
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
            toast(formatWikiSyntaxErrorMessage(error));
          }
        }
        break;
      }
      default:
        break;
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
    <>
      <Helmet title={`${subjectWikiInfo.name} 的新描述`} />
      <Layout
        type='alpha'
        leftChildren={
          <>
            <div className={title}>修改详细描述</div>
            <Divider className={divider} />
            <Form labelWidth={120} onSubmit={handleSubmit(onSubmit)} className={form}>
              <Form.Item label='条目名'>
                <Input
                  type='text'
                  wrapperClass={formInput}
                  defaultValue={subjectWikiInfo.name}
                  {...register('subject.name', { required: true })}
                />
              </Form.Item>

              {subjectWikiInfo.availablePlatform.length && (
                <Form.Item label='类型'>
                  <div className={flexOne}>
                    <Radio.Group>
                      {subjectWikiInfo.availablePlatform.map((type) => (
                        <Radio
                          id={type.text}
                          data-tpl={type.wiki_tpl}
                          className={formRadio}
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
                    <div className={tips}>
                      注意：切换类型会导致项目顺序发生变化，请先选择好模板再进行排序
                    </div>
                  </div>
                </Form.Item>
              )}

              <Form.Item label='描述信息'>
                <div className={formDetailInfo}>
                  <Radio.Group>
                    {EditorTypeRadio.map((type) => (
                      <Radio
                        className={formRadio}
                        key={type.key}
                        name='editor_mode'
                        label={type.label}
                        onClick={() => {
                          handleSetEditorType(type.key);
                        }}
                        checked={editorType === type.key}
                        readOnly
                      />
                    ))}
                  </Radio.Group>

                  {/* 入门编辑模式 */}
                  <div hidden={editorType !== EditorType.Beginner}>
                    <WikiBeginnerEditor
                      elements={wikiElement}
                      onChange={(els) => {
                        setWikiElement(els);
                      }}
                    />
                  </div>

                  {/* Wiki 编辑模式 */}
                  <div hidden={editorType !== EditorType.Wiki}>
                    <WikiEditor instanceRef={monoEditorInstanceRef} />
                  </div>
                </div>
              </Form.Item>

              <Form.Item label='剧情介绍'>
                <textarea
                  className={formTextArea}
                  defaultValue={subjectWikiInfo.summary}
                  {...register('subject.summary', { required: true })}
                />
              </Form.Item>

              <Form.Item label='受限内容'>
                <div className={formRadio}>
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
                <Input.Group className={formInputGroup}>
                  <Select
                    defaultValue='0'
                    options={BuiltInCommitMessage}
                    className={formSelect}
                    onChange={(value) => {
                      setValue('commitMessage', value?.label ?? '');
                    }}
                  />
                  <Input
                    wrapperClass={formInput}
                    {...register('commitMessage', { required: true })}
                  />
                </Input.Group>
              </Form.Item>

              <Button htmlType='submit' color='blue' className={formButton}>
                提交修改
              </Button>
            </Form>
          </>
        }
        rightChildren={
          <div className={flexColumn}>
            <div className={editorHandbook}>
              <div className={title}>编辑说明</div>
              <Divider className={divider} />
              <div className={editorHandbookContent}>
                <p>切换类型会导致已编辑项目顺序发生变化，请先选择好类型模板再进行排序</p>
                <p>可拖拽改变行顺序</p>
                <p>
                  欲把一级项目切换为二级，将光标移至「项目名」输入框最右侧即可看到缩进按钮；从二级切换回一级的按钮位于二级项目名左侧
                </p>
                <p>
                  按 <kbd>Ctrl</kbd> + <kbd>Enter</kbd> 可将一级项目切换为二级项目
                </p>
                <p>
                  按 <kbd>Ctrl</kbd> + <kbd>X</kbd> 可删除当前行的项目
                </p>
              </div>
            </div>

            {/* history */}
            <div className={flexColumn}>
              <div className={title}>条目修订历史</div>
              <Divider className={divider} />
              <div className={history}>
                {subjectEditHistory.map((his, idx) => (
                  <div key={idx} className={historyItem}>
                    <span className={historyUserName}>{his.creator.username}</span>
                    <span className={historyMsg} title={his.commitMessage}>
                      {his.commitMessage}
                    </span>
                    <span className={cx(historySuffix, historyCreateAt)}>
                      @ {dayjs.unix(his.createdAt).format('YYYY-MM-DD HH:mm')}
                    </span>
                    <span className={historySuffix}>|</span>
                    <span className={historySuffix}>恢复</span>
                  </div>
                ))}
                <Button.Link
                  type='plain'
                  to={WikiEditTabsItemsByKey.history.to(subjectId.toString())}
                  className={historyMore}
                >
                  更多修改记录
                  <ArrowRightCircle />
                </Button.Link>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default withErrorBoundary(WikiEditDetailDetailPage);
