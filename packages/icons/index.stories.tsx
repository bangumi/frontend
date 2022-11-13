import React from 'react'
import type { Story, ComponentMeta } from '@storybook/react'
import * as Icons from './dist'

type IComponent = React.FC<React.SVGProps<SVGSVGElement> & {
  title?: string
}>

const componentMeta: ComponentMeta<IComponent> = {
  title: 'Icons',
  subcomponents: Icons,
  decorators: [
    story => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(8rem,1fr))',
          gap: '2rem',
          maxWidth: '80rem',
          margin: 'auto'
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
    Object.keys(Icons).map(iconName => {
      const Icon = (Icons as any)[iconName] as IComponent
      return (
        <div
          key={iconName}
          style={{
            textAlign: 'center',
            height: 100,
            border: 'solid 2px #dedede',
            borderRadius: '5px',
            padding: '1rem'
          }}
        >
          <p style={{ paddingBottom: '1.5rem', fontWeight: '600' }}>{iconName}</p>
          <Icon height={height} width={width} style={style} />
        </div>
      )
    }
    )
  }
</>

export const Usage = Template.bind({})
