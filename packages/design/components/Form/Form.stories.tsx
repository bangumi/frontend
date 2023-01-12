import './Form.stories.less';

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import Divider from '../Divider';
import Input from '../Input';
import Select from '../Select';
import Form from '.';

const componentMeta: ComponentMeta<typeof Form> = {
  title: 'Modern/Form',
  component: Form,
  argTypes: {
    onSubmit: {
      action: 'clicked',
    },
  },
};

export default componentMeta;

const Template: ComponentStory<typeof Form> = (args) => {
  //   const handleSubmit = (value: any) => {
  //     console.log(value);
  //   };
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const { register, handleSubmit } = useForm();

  return (
    <Form labelCol={120} onSubmit={handleSubmit(onSubmit)}>
      <Form.Item label='类别名'>
        <Input
          type='text'
          wrapperStyle={{
            borderRadius: '12px',
          }}
          {...register('name')}
        />
      </Form.Item>

      <Form.Item label='类型'>
        <Input type='text' {...register('type')} />
      </Form.Item>

      <Form.Item label='剧情介绍'>
        <textarea {...register('剧情')} />
      </Form.Item>

      <Form.Item label='编辑摘要'>
        <Input
          prefix={
            <>
              <Select
                options={[
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                ]}
                style={{
                  width: '120px',
                }}
                defaultValue='1'
              />
              <Divider orientation='vertical' className='divider' />
            </>
          }
        />
      </Form.Item>

      <Form.Item label='描述信息'>
        <Input.Group>
          <Input
            placeholder='项目名'
            wrapperStyle={{
              width: '20%',
            }}
          />
          <Input />
        </Input.Group>
      </Form.Item>

      <Button htmlType='submit' shape='rounded'>
        提交修改
      </Button>
    </Form>
  );
};

export const Default = Template.bind({});
