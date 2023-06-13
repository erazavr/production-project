import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { Popover } from './Popover'

export default {
  title: 'features/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

export const Normal = Template.bind({})
Normal.args = {}
