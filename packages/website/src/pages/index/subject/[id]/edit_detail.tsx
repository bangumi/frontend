import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button, Divider, Form, Input, Layout, Select } from '@bangumi/design';

import style from './common.module.less';

const types = [
  { label: 'TV' },
  { label: 'WEB' },
  { label: 'OVA' },
  { label: '剧场版' },
  { label: '其它' },
];

const WikiEditPage: React.FC = () => {
  const { id } = useParams();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const { register, handleSubmit } = useForm();
  return (
    <>
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
                <Input type='text' wrapperClass={style.formInput} {...register('type')} />
              </Form.Item>

              <Form.Item label='剧情介绍'>
                <textarea className={style.formTextArea} {...register('剧情')} />
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

              <Form.Item label='描述信息'>
                <Input.Group className={style.formInputGroup}>
                  <Input
                    placeholder='项目名'
                    wrapperStyle={{
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
    </>
  );
};

export default WikiEditPage;
