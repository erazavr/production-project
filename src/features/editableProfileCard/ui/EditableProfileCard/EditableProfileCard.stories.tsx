import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

import { EditableProfileCard } from './EditableProfileCard'

export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof EditableProfileCard>

const Template: ComponentStory<typeof EditableProfileCard> = (args) =>
  <EditableProfileCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
