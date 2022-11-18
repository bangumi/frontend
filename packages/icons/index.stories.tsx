import React from 'react';
import type { Story, ComponentMeta } from '@storybook/react';
import * as Icons from '.';

type IComponent = React.FC<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
  }
>;

const componentMeta: ComponentMeta<IComponent> = {
  title: 'Icons',
  subcomponents: Icons,
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
const Template: Story<{ height: number; width: number; style: React.CSSProperties }> = ({
  height,
  width,
  style,
}) => (
  <>
    {Object.keys(Icons).map((iconName) => {
      const Icon = (Icons as any)[iconName] as IComponent;
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
