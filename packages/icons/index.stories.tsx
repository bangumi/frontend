import React from 'react'
import type { Story, ComponentMeta } from '@storybook/react'
import { FilledStar, EmptyStar, HalfStar, Notification, Delete, Setting, Search } from '.'

const componentMeta: ComponentMeta<typeof FilledStar> = {
  title: 'Icons',
  subcomponents: {
    FilledStar,
    EmptyStar,
    HalfStar,
    Notification,
    Delete,
    Setting,
    Search
  },
  decorators: [
    story => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 'auto',
          flexWrap: 'wrap',
          margin: '0 10rem'
        }}
      >{story()}
      </div>
    )
  ],
  args: {
    height: 40,
    width: 40
  },
  argTypes: {
    style: {
      control: {
        type: 'object',
        defaultValue: {}
      }
    }
  }
}

export default componentMeta

// eslint-disable-next-line react/prop-types
const Template: Story<{ height: number, width: number, style: React.CSSProperties }> = ({ height, width, style }) => <>
  {
    [
      {
        Component: FilledStar,
        name: 'FilledStar'
      },
      {
        Component: EmptyStar,
        name: 'EmptyStar'
      },
      {
        Component: HalfStar,
        name: 'HalfStar'
      },
      {
        Component: Notification,
        name: 'Notification'
      },
      {
        Component: Delete,
        name: 'Delete'
      },
      {
        Component: Setting,
        name: 'Setting'
      },
      {
        Component: Search,
        name: 'Search'
      }
    ].map(Icon =>
      <div key={Icon.name} style={{ textAlign: 'center', width: 120 }}>
        <p>{Icon.name}</p>
        <Icon.Component height={height} width={width} style={style} />
      </div>
    )
  }
</>

export const Usage = Template.bind({})
