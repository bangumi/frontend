import { ok } from 'oazapfts';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Form, Input, Layout, Select } from '@bangumi/design';

import { _TEST_SUBJECTS_,WikiEditTabs } from './_shared';
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
    label: '入门模式',
  },
  {
    key: EditorType.Wiki,
    label: 'Wiki模式',
  },
];

const WikiEditPage: React.FC = () => {
  // const { id } = useParams();

  const { register, handleSubmit } = useForm();
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

  const [list] = useState([
    { name: 'hi', content: 'body' },
    { name: 'hi2', content: 'body2' },
    { name: 'hi3', content: 'body3' },
  ]);

  const [editorType, setEditorType] = useState(EditorType.Beginner);

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
                <Input type='text' wrapperClass={style.formInput} {...register('name')} />
              </Form.Item>

              <Form.Item label='类型'>
                <div className={style.formRadioGroup}>
                  {types.map((type) => (
                    <div key={type.label} className={style.formRadio}>
                      <input type='radio' name='type' />
                      <label>{type.label}</label>
                    </div>
                  ))}
                </div>
              </Form.Item>

              <Form.Item label='描述信息'>
                <div className={style.formDetailInfo}>
                  <div className={style.formRadioGroup}>
                    {EditorTypeRadio.map((type) => (
                      <div
                        className={style.formRadio}
                        key={type.key}
                        onClick={() => setEditorType(type.key)}
                      >
                        <input
                          type='radio'
                          name='editor_mode'
                          value={type.key}
                          checked={editorType === type.key}
                          readOnly
                        />
                        <label>{type.label}</label>
                      </div>
                    ))}
                  </div>

                  <div hidden={editorType !== EditorType.Beginner}>
                    <div className={style.formDetailInfo}>
                      {list.map((item) => (
                        <Input.Group key={item.name} className={style.formInputGroup}>
                          <Input
                            wrapperStyle={{
                              width: '170px',
                              borderTopLeftRadius: '12px',
                              borderBottomLeftRadius: '12px',
                            }}
                          />
                          <Input wrapperClass={style.formInput} />
                        </Input.Group>
                      ))}
                    </div>
                  </div>

                  <div hidden={editorType !== EditorType.Wiki}>
                    <WikiEditor />
                  </div>
                </div>
              </Form.Item>

              <Form.Item label='剧情介绍'>
                <textarea className={style.formTextArea} {...register('剧情')} />
              </Form.Item>

              <Form.Item label='受限内容'>
                <div className={style.formRadio}>
                  <input type='checkbox' id='nsfw' name='nsfw' />
                  <label htmlFor='nsfw'>标记为受限内容</label>
                </div>
              </Form.Item>

              <Form.Item label='编辑摘要'>
                <Input.Group className={style.formInputGroup}>
                  <Select
                    defaultValue='1'
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                    ]}
                    style={{
                      width: '170px',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                    }}
                  />
                  <Input wrapperClass={style.formInput} />
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
