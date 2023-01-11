import { ok } from 'oazapfts';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Form, Input, Layout, Radio, Select } from '@bangumi/design';
import { Minus, Plus } from '@bangumi/icons';
import { parseWiki } from '@bangumi/utils';

import { _TEST_SUBJECTS_, WikiEditTabs } from './_shared';
import style from './common.module.less';
import WikiEditor from './components/WikiEditor/WikiEditor';
import WikiLayout from './components/WikiLayout';

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

const WikiEditPage: React.FC = () => {
  // const { id } = useParams();

  const { register, handleSubmit, setValue, getValues } = useForm();
  const id = _TEST_SUBJECTS_;
  const { data } = useSWR(
    `/wiki/subjects/$ {id}`,
    async () => ok(ozaClient.subjectInfo(Number(id))),
    {
      suspense: true,
    },
  );
  const onSubmit = (data: any) => {
    console.log(data);
  };

  // TODO: shim this into localStorage
  const [editorType, setEditorType] = useState(EditorType.Beginner);

  // useMemo
  const w = parseWiki(TEMPLATE);

  return (
    <WikiLayout activeTab={WikiEditTabs.Detail} id={id} name={data!.name}>
      {/* <Tab */}
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
                  {...register('subject.infobox')}
                />
              </Form.Item>

              <Form.Item label='类型'>
                <div className={style.formRadioGroup}>
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
                </div>
              </Form.Item>

              <Form.Item label='描述信息'>
                <div className={style.formDetailInfo}>
                  <div className={style.formRadioGroup}>
                    {EditorTypeRadio.map((type) => (
                      <Radio
                        className={style.formRadio}
                        key={type.key}
                        name='editor_mode'
                        label={type.label}
                        onClick={() => setEditorType(type.key)}
                        checked={editorType === type.key}
                        readOnly
                      />
                    ))}
                  </div>

                  <div hidden={editorType !== EditorType.Beginner}>
                    {/* TODO: 渲染二级项目 */}
                    {w.data.map((item) => (
                      <div key={item.key} className={style.formDetailInfoItem}>
                        <Input.Group className={style.formInputGroup}>
                          <Input
                            wrapperStyle={{
                              width: '170px',
                              borderTopLeftRadius: '12px',
                              borderBottomLeftRadius: '12px',
                            }}
                            defaultValue={item.key}
                          />
                          <Input wrapperClass={style.formInput} defaultValue={item.value} />
                        </Input.Group>

                        <Minus className={style.formDetailInfoItemMinus} />

                        <div className={style.formDetailInfoItemAdd}>
                          <Plus className={style.formDetailInfoItemPlus} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div hidden={editorType !== EditorType.Wiki}>
                    <WikiEditor defaultValue={TEMPLATE} />
                  </div>

                  {/* 不显示，只作为表单受控组件 */}
                  <textarea hidden value={TEMPLATE} {...register('subject.infobox')} />
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
      {/* <DetailEditor /> */}
    </WikiLayout>
  );
};

export default WikiEditPage;
