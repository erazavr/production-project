import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { NotificationList } from './NotificationList'

export default {
  title: 'features/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
