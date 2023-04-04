import type { Meta, StoryFn } from '@storybook/react';
import type { FC } from 'react';
import React from 'react';

import { UnreadableCodeError } from '@bangumi/utils';

import * as Icons from '.';

type IComponent = React.FC<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
  }
>;

const componentMeta: Meta<IComponent> = {
  title: 'Icons',
  subcomponents: Icons as Record<string, FC<unknown>>,
  decorators: [
    (story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 'auto',
          flexWrap: 'wrap',
          margin: '0 10rem',
        }}
      >
        {story()}
      </div>
    ),
  ],
  args: {
    height: 40,
    width: 40,
  },
  argTypes: {
    style: {
      control: {
        type: 'object',
        defaultValue: {},
      },
    },
  },
};

export default componentMeta;

/* eslint-disable react/prop-types */
const Template: StoryFn<{ height: number; width: number; style: React.CSSProperties }> = ({
  height,
  width,
  style,
}) => (
  <>
    {Object.keys(Icons).map((iconName) => {
      const Icon = (Icons as Record<string, IComponent>)[iconName];
      if (Icon === undefined) {
        throw new UnreadableCodeError(`BUG: unknown icon name ${JSON.stringify(iconName)}`);
      }
      return (
        <div key={iconName} style={{ textAlign: 'center', width: 120 }}>
          <p>{iconName}</p>
          <Icon height={height} width={width} style={style} />
        </div>
      );
    })}
  </>
);
/* eslint-enable react/prop-types */

export const Usage = Template.bind({});
